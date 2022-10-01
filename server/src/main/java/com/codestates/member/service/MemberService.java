package com.codestates.member.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codestates.exception.CustomException;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public Member createMember(Member member) {
        verifyExistsEmail(member.getMemberName()); //등록된 이메일인지 확인

        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        member.setRoles("ROLE_USER");
        member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);
        return memberRepository.save(member);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId()); //ID로 멤버 존재 확인하고 Member 정보 반환

        Optional.ofNullable(member.getNickname())
                .ifPresent(name -> findMember.setNickname(name));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(bCryptPasswordEncoder.encode(password)));
        Optional.ofNullable(member.getImageUrl())
                .ifPresent(findMember::setImageUrl);

//        findMember.setLast_edit_date(LocalDateTime.now());

        return memberRepository.save(findMember);
    }

    public String uploadImage(MultipartFile multipartFile) {
        String fileName = createFileName(multipartFile.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        log.info("fileName: " + fileName);
        log.info("bucket:" + bucket);

        String url = generateUrl(fileName, HttpMethod.GET);

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
        }

        return url;
    }

    private String generateUrl(String fileName, com.amazonaws.HttpMethod httpMethod) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 2); // Generated URL will be valid for 2minutes
        return amazonS3.generatePresignedUrl(bucket, fileName, calendar.getTime(), httpMethod).toString();
    }

    public String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

    private void verifyExistsEmail(String memberName) {
        Member member = memberRepository.findByMemberName(memberName);

        if (member != null) {
            throw new IllegalStateException();
        }
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member = optionalMember.orElseThrow(() -> new CustomException("Member not Found", HttpStatus.NOT_FOUND)); // Todo: 9/30일 조진우 수정함.
        return member;
    }
}