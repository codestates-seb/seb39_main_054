package com.codestates.member.jwt.oauth;

import com.codestates.member.entity.Member;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Data
public class PrincipalDetails implements UserDetails { // Spring Security 에서 사용자의 정보를 담는 인터페이스

    private Member member;

    public PrincipalDetails(Member member) {
        this.member = member;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { // 계정의 권한 목록을 리턴
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        member.getRoleList().forEach(n -> {
            authorities.add(() -> n);
        });
        return authorities;
    }

    @Override
    public String getUsername() {
        return member.getMemberName();
    }

    @Override
    public String getPassword() {
        return member.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
