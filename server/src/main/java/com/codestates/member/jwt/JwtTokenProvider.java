package com.codestates.member.jwt;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider {
//    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey = "token-secret-key";

    //    @Value("${security.jwt.token.expire-length:3600000}")
    private final long validityInMilliseconds = 3600000 * 24; // 1h

    @Value("${security.jwt.token.expire-length:3600000}")
    private long refreshValidityInMilliseconds = 3600000 * 24; // 1h

    private final MemberRepository memberRepository;

    public JwtTokenProvider(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(Long id, String email, Collection<? extends GrantedAuthority> appUserRoles) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("id", id);
        claims.put("auth", appUserRoles.stream().map(s -> new SimpleGrantedAuthority(s.getAuthority())).filter(Objects::nonNull).collect(Collectors.toList()));

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()//
                .setClaims(claims)//
                .setIssuedAt(now)//
                .setExpiration(validity)//
                .signWith(SignatureAlgorithm.HS256, secretKey)//
                .compact();
    }

    @Transactional
    public String createRefreshToken(Long id) {
        Date now = new Date();
        String refreshToken = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshValidityInMilliseconds))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        memberRepository.updateRefreshToken(id, refreshToken);

        return refreshToken;
    }

    public Authentication getAuthentication(String token) {
        String email = getUsername(token);
        Long id = getClaim(token).get("id", Long.class);
        String roles = getClaim(token).get("auth").toString();
        Member member = Member.builder()
                .memberId(id)
                .roles(roles)
                .email(email)
                .build();
        Set<GrantedAuthority> roleSet = new HashSet<>();
        String[] roleList = roles.split(",");
        for (String s : roleList) {
            roleSet.add(new SimpleGrantedAuthority(s));
        }


        return new UsernamePasswordAuthenticationToken(member, "", roleSet);
//        UserDetails userDetails = myUserDetails.loadUserByUsername(getUsername(token));
//        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String getEmail(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public Claims getClaim(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new BusinessLogicException(ExceptionCode.JWT_TOKEN_NOT_AUTHORIZED);
        }
    }

    public boolean validateTokenExceptExpiration(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
