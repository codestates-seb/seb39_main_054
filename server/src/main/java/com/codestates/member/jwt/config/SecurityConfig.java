package com.codestates.member.jwt.config;

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
@EnableWebSecurity (debug = true) // 시큐리티 활성화 -> 기본 스프링 필터 체인에 등록
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsFilter corsFilter;
    private final MemberRepository memberRepository;

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
                .antMatchers(HttpMethod.POST,"/v1/questions","/v1/answers")
                .access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.PATCH,"/v1/questions/**","/v1/answers/**","/v1/members/**")
                .access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.GET,"/v1/members/**")
                .access("hasRole('ROLE_USER')")
                .antMatchers(HttpMethod.DELETE,"/v1/questions/**","/v1/answers/**")
                .access("hasRole('ROLE_USER')")
                .anyRequest().permitAll();
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

















