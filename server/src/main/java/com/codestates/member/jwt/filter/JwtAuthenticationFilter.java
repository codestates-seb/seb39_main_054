package com.codestates.member.jwt.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.codestates.member.entity.Member;
import com.codestates.member.jwt.oauth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    // 인증 요청시에 실행되는 함수 => /login
    // Authentication 객체 만들어서 리턴 => 의존 : AuthenticationManager
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            // request에 있는 username과 password를 파싱해서 자바 Object로 받기
            ObjectMapper om = new ObjectMapper();
            Member member = om.readValue(request.getInputStream(), Member.class);

            // 유저네임패스워드 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member.getMemberName(), member.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
            return authentication;

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    // JWT Token 생성 후 전달
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        System.out.println("successfulAuthentication");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject("PreProject54Team")
                // TODO 운영 배포 시 600분 -> 60분 으로 수정할 것
                .withExpiresAt(new Date(System.currentTimeMillis() + (1000 * 60 * 600))) // 600분
                .withClaim("id", principalDetails.getMember().getMemberId())
                .withClaim("nickname", principalDetails.getMember().getNickname())
                .withClaim("memberName",principalDetails.getMember().getMemberName())
                .sign(Algorithm.HMAC512("PreProject54")); // PreProject54는 SecretKey이다.

        response.addHeader("Authorization", "Bearer " + jwtToken);
        response.addIntHeader("memberId", Math.toIntExact(principalDetails.getMember().getMemberId()));
        response.addHeader("roles", principalDetails.getMember().getRoles());
    }
}
