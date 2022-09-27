package com.codestates.member.service;

import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

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

//        findMember.setLast_edit_date(LocalDateTime.now());

        return memberRepository.save(findMember);
    }

    private void verifyExistsEmail(String memberName) {
        Member member = memberRepository.findByMemberName(memberName);

        if (member != null) {
            throw new IllegalStateException();
        }
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() -> new IllegalStateException());
        return findMember;
    }
}
