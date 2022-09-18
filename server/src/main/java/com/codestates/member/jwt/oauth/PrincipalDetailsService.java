package com.codestates.member.jwt.oauth;

import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService { //Spring Security 에서 유저의 정보를 가져오는 인터페이스이다

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String memberName) throws UsernameNotFoundException {

        Member memberEntity = memberRepository.findByMemberName(memberName);
        return new PrincipalDetails(memberEntity);

    }
}