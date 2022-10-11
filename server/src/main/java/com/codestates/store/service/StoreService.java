package com.codestates.store.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.codestates.exception.CustomException;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import com.codestates.member.service.MemberService;

import com.codestates.simage.entity.Simage;
import com.codestates.simage.repository.SimageRepository;
import com.codestates.store.entity.Store;
import com.codestates.store.mapper.StoreMapper;
import com.codestates.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class StoreService {

    private final MemberService memberService;
    private final StoreRepository storeRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;
    private final SimageRepository simageRepository ;
    private final StoreMapper mapper;
    private final AmazonS3Client amazonS3Client;
    private final MemberRepository memberRepository;



    /**
     * 매장 등록
     */
    public Store createStore(Store store, Long memberId, List<Simage> simageList) {

        simageList.stream().forEach(simage -> {
            simage.setStore(store);
        });
        Member member = memberService.findVerifiedMember(memberId);
        findVerifiedAdmin(memberId);
        store.setMember(member);
        return storeRepository.save(store);
    }

    /**
     * 매장 수정
     */
    public Store updateStore(Store store, Long memberId) {

        Store certifiedStore = verifyStore(store.getStoreId());
        findVerifiedAdmin(memberId);

        Optional.ofNullable(store.getTitle()).ifPresent(certifiedStore::setTitle);
        Optional.ofNullable(store.getDescription()).ifPresent(certifiedStore::setDescription);
        Optional.ofNullable(store.getScategory()).ifPresent(certifiedStore::setScategory);
        certifiedStore.setLastEditDate(LocalDateTime.now());
        return storeRepository.save(certifiedStore);
    }

    // 매장 등록 여부 확인
    public Store verifyStore(Long storeId) {
        return storeRepository.findById(storeId).orElseThrow(() -> new CustomException("Store not Found", HttpStatus.NOT_FOUND));
    }

    /**
     * AWS 이미지 등록
     */
    public List<Simage> uploadImage(List<MultipartFile> multipartFileList, List<String> imageUrlList) {

        List<Simage> simageList = multipartFileList.stream().map(file -> {
            Simage simage = new Simage();
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            String url = amazonS3Client.getUrl(bucket, fileName).toString();
//            String url = generateUrl(fileName, HttpMethod.GET);
            simage.setImageUrl(url);
            imageUrlList.add(url);

            try(InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "이미지 업로드에 실패했습니다.");
            }
            return simage;
        }).collect(Collectors.toList());

        return simageList;
    }

    /**
     * 이미지 업데이트
     */
    public List<String> updateImage(long storeId, List<String> updatedImageUrl) {

        Optional<List<Simage>> optionalSimageList = simageRepository.findByStoreId(storeId);
        List<Simage> legacySimageList = optionalSimageList.orElseThrow(() -> new CustomException("Image not found", HttpStatus.NOT_FOUND));

        legacySimageList.stream()
                .forEach(image -> image.setLastEditDate(LocalDateTime.now()));

        List<Simage> deleteImageList = legacySimageList.stream()
                .filter(image -> !updatedImageUrl.contains(image.getImageUrl()))
                .collect(Collectors.toList());

        deleteImageList.stream()
                .forEach(deleteimage -> simageRepository.deleteById(deleteimage.getSimageId()));

        List<Simage> modifiedSimageList = simageRepository.findByStoreId(storeId).get();

        List<String> modifiedImageUrlList = modifiedSimageList.stream()
                .map(image -> image.getImageUrl())
                .collect(Collectors.toList());

        return modifiedImageUrlList;
    }

    /**
     * AWS URL 생성
     */
    private String generateUrl(String fileName, HttpMethod httpMethod) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 2); // Generated URL will be valid for 2minutes
        return amazonS3.generatePresignedUrl(bucket, fileName, calendar.getTime(), httpMethod).toString();
    }

    /**
     * AWS 파일 이름 생성
     */
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

    /**
     * 매장 삭제
     */
    public void deleteQuestion(long storeId,long memberId) {
        Store certifiedStore  = verifyStore(storeId);
        findVerifiedAdmin(memberId);
        storeRepository.delete(certifiedStore);
    }

    /**
     * 매장 상세 조회
     */
    public Store findStore(long storeId, long principalId) {

        Optional<Store> optionalStore = storeRepository.findById(storeId);
        Store store = optionalStore.orElseThrow(() -> new CustomException("Store not Found", HttpStatus.NOT_FOUND));

        return store;
    }


    /**
     * 매장 리스트 조회
     */
    public PageImpl<Store> findStoreList(int page, int size, String scategoryName, String keyword, long principalId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("storeId").descending());
        PageImpl<Store> storeList = storeRepository.findByCategoryKeyword(scategoryName, keyword,pageRequest);


        return storeList;
    }
//
//    /**
//     * 유저가 작성한 게시물 조회
//     */
//    public Page<Store> findMemberList(int page, int size,long principalId) {
//        PageRequest pageRequest = PageRequest.of(page, size,Sort.by("STORE_ID").descending());
//        Optional<Page<Store>> optionalStoreList = storeRepository.findByMemberId(principalId,pageRequest);
//        Page<Store> storeList = optionalStoreList.orElseThrow(() -> new CustomException("Member doesn't write Store", HttpStatus.NOT_FOUND));
//
//        return storeList;
//    }

    /**
     * 작성자가 ADMIN 계정인지 확인
     */
    public void findVerifiedAdmin(long memberId) {

        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member member = optionalMember.orElseThrow(() -> new CustomException("Member not Found", HttpStatus.NOT_FOUND)); // Todo: 9/30일 조진우 수정함.
        if (!member.getRoles().equals("ROLE_ADMIN")) throw new CustomException("You are not ROLE_ADMIN", HttpStatus.FORBIDDEN);
    }

}