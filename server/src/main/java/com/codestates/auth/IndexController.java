package com.codestates.auth;

import com.codestates.member.jwt.oauth.PrincipalDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

// login, oauth 테스트용 controller
@Controller
@RequestMapping("/auths")
public class IndexController {
    @GetMapping("/login-form")
    public String loginForm() {
        return "login";
    }

    @GetMapping("/loginTest")
    public @ResponseBody String loginTest(Authentication authentication) {
        System.out.println("=======================/loginTest=====================");
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("principalDetails.getMember() = " + principalDetails.getMember());
        return "세션 정보 확인";
    }

    @GetMapping("/loginTest2")
    public @ResponseBody String loginTest2(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        System.out.println("=======================/loginTest2=====================");
        System.out.println("principalDetails.getMember() = " + principalDetails.getMember());
        return "세션 정보 확인2";
    }

    // 추가
    @GetMapping("/loginTest3")
    public @ResponseBody String loginOAuthTest(
            Authentication authentication,
            @AuthenticationPrincipal OAuth2User oauth) {
        System.out.println("============/loginOAuthTest===========");
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        System.out.println("authenticaion : " + oauth2User.getAttributes());
        System.out.println("oauth2User : " + oauth.getAttributes());
        return "세션 정보 확인3";
    }

    @GetMapping("/")
    public String index(@AuthenticationPrincipal PrincipalDetails principalDetails, Model model) {
        System.out.println("principalDetails = " + principalDetails);

        try {
            if(principalDetails.getUsername() != null) {
                model.addAttribute("username", principalDetails.getUsername());
            }
        } catch (NullPointerException e) {}
        return "index1";
    }
}
