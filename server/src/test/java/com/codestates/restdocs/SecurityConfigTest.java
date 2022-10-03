package com.codestates.restdocs;

import com.codestates.helper.ControllerTestHelper;
import com.codestates.helper.MemberStubData;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.entity.Member;
import com.codestates.member.jwt.oauth.PrincipalDetails;
import com.codestates.member.jwt.oauth.PrincipalDetailsService;
import com.codestates.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.List;

import static com.codestates.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultHandlers.exportTestSecurityContext;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
//@DataJpaTest
//@AutoConfigureMockMvc
@AutoConfigureRestDocs
@ExtendWith({RestDocumentationExtension.class, SpringExtension.class})
//@ContextConfiguratioxn(classes = SecurityConfig.class)
//@WebAppConfiguration
class SecurityConfigTest implements ControllerTestHelper {

    @Autowired
    private WebApplicationContext context;

    @Autowired
//    @MockBean
    private MemberRepository memberRepository;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    private Member member;

//    @Autowired
    private MockMvc mockMvc;

    private AuthenticationManager authenticationManager;

    @BeforeEach
//    public void setup(WebApplicationContext ctx,
//
//                      RestDocumentationContextProvider restDocumentation) {
//
//        this.mockMvc = MockMvcBuilders.webAppContextSetup(ctx)
//
//                .addFilters(new CharacterEncodingFilter("UTF-8", true))  // 필터 추가
//
//                .addFilters(new JwtAuthenticationFilter(new AuthenticationManager() {
//                    @Override
//                    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//                        return null;
//                    }
//                }))
//                .apply(documentationConfiguration(restDocumentation))
//
//                .build();


    public void setup(RestDocumentationContextProvider restDocumentationContextProvider) {
        member = new Member(1L, "user", passwordEncoder.encode("password"), "beforeEach");
        member.setRoles("USER");
        memberRepository.save(member);
//        Member user = memberRepository.findByMemberName("user");

        PrincipalDetailsService principalDetailsService = new PrincipalDetailsService(memberRepository);

        PrincipalDetails principalDetails = new PrincipalDetails(member);
//        principalDetails.setMember(member);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member.getMemberName(), member.getPassword(), List.of(new SimpleGrantedAuthority("USER")));
//        Authentication authentication = authenticationManager.authenticate(authenticationToken);

//        SecurityContextHolder.getContext().setAuthentication(authentication);

        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .addFilters(new CharacterEncodingFilter("UTF-8",  true))
                .apply(springSecurity())
                .apply(documentationConfiguration(restDocumentationContextProvider))
                .build();

    }

    @Test
    @DisplayName("Login 테스트")
    public void login_test() throws Exception {
        // given
//        String userId = "csytest1";
//        String password = "1234qwer";

        MemberPostDto post = (MemberPostDto) MemberStubData.MockMember.getRequestBody(HttpMethod.POST);
        String content = toJsonContent(post);

        // when
        //TODO 09/21 404 Not Found 에러 발생 처리 요망
        mockMvc.perform(postRequestBuilder("/login", content))
                .andDo(print())
                .andDo(exportTestSecurityContext())
                // then
                .andExpect(status().isOk())

//                .andExpect(authenticated())
                .andDo(document("post-login",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("memberName").type(JsonFieldType.STRING).description("사용자ID"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임").ignored()

                                )
                        ),
                        responseHeaders(
                                headerWithName("Authorization").description("JWT Bearer Token"),
                                headerWithName("memberId").description("회원 식별자")
                        )
                        ));
    }
}
