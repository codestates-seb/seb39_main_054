package com.codestates.member.jwt.config;

import com.codestates.config.oauth.CustomOauth2SuccessHandler;
import com.codestates.config.oauth.PrincipalOauth2UserService;
import com.codestates.member.jwt.filter.JwtAuthenticationFilter;
import com.codestates.member.jwt.filter.JwtAuthorizationFilter;
import com.codestates.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity // 시큐리티 활성화 -> 기본 스프링 필터 체인에 등록
@RequiredArgsConstructor
public class SecurityConfig {

    private final PrincipalOauth2UserService principalOauth2UserService;
    private final CorsFilter corsFilter;
    private final MemberRepository memberRepository;

    private final CustomOauth2SuccessHandler customOauth2SuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //http.addFilterBefore(new FirstFilter(), BasicAuthenticationFilter.class); // 지정된 필터 앞에 커스텀 필터를 추가 (BasicAuthenticationFilter 보다 먼저 실행된다)
        http.csrf().disable();
        http.headers().frameOptions().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)//session, cookie를 만들지 않고 Token(STATELESS)로 진행하겠다는 의미
                .and()
                .formLogin().disable() // form 로그인 X
                .httpBasic().disable() // http 통신 X -> https 사용하면 ID와 Password가 암호화되어 전달되기 때문이다.
                .apply(new CustomDsl()) // 추가
                .and()
                .authorizeRequests()
//                .antMatchers("/v1/**").hasRole("USER")
                .antMatchers(HttpMethod.POST,"/v1/product")
                .access("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
                .antMatchers(HttpMethod.PATCH,"/v1/product/**","/v1/members/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.GET,"/v1/members/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.DELETE,"/v1/product/**")
                .access("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.POST, "/v1/store")
                .access("hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.PATCH, "/v1/store/**")
                .access("hasRole('ROLE_ADMIN')")
                .antMatchers(HttpMethod.DELETE, "/v1/store/**")
                .access("hasRole('ROLE_ADMIN')")
                .anyRequest().permitAll()
                .and()
                .logout()
                .logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                .loginPage("/auths/login-form")     // TODO 9/26 로그인 페이지 프론트 주소로 변경 (https://....../login)
                .authorizationEndpoint()
                .and()
                .successHandler(customOauth2SuccessHandler)
                .userInfoEndpoint()
                .userService(principalOauth2UserService)
        ;
        return http.build();
    }

    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            builder
                    .addFilter(corsFilter)
                    .addFilter(new JwtAuthenticationFilter(authenticationManager)) // 인증
                    .addFilter(new JwtAuthorizationFilter(authenticationManager,memberRepository)); // 인가
        }
    }
}

















