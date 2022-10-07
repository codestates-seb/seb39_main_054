package com.codestates.config.oauth;

import com.codestates.member.jwt.JwtTokenProvider;
import com.codestates.member.jwt.oauth.PrincipalDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomOauth2SuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private final JwtTokenProvider jwtTokenProvider;

    public CustomOauth2SuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String access = jwtTokenProvider.createToken(principal.getId(), principal.getUsername(), principal.getAuthorities());
        String refresh = jwtTokenProvider.createRefreshToken(principal.getId());
        System.out.println("success login");

        Cookie accessDeploy = new Cookie("access", access);
        accessDeploy.setMaxAge(7 * 24 * 60 * 60);
        accessDeploy.setPath("/");
        accessDeploy.setDomain("localhost");
        response.addCookie(accessDeploy);

        Cookie refreshDeploy = new Cookie("refresh", refresh);
        refreshDeploy.setMaxAge(7 * 24 * 60 * 60);
        refreshDeploy.setSecure(true);
        refreshDeploy.setHttpOnly(true);
        refreshDeploy.setDomain("localhost");
        refreshDeploy.setPath("/");
        response.addCookie(refreshDeploy);

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, "http://localhost:8080");
    }
}
