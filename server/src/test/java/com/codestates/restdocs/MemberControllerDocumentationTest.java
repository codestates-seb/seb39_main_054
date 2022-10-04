package com.codestates.restdocs;

import com.codestates.helper.MemberControllerTestHelper;
import com.codestates.helper.MemberStubData;
import com.codestates.member.controller.MemberController;
import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.dto.MemberResponseDto;
import com.codestates.member.entity.Member;
import com.codestates.member.jwt.oauth.PrincipalDetails;
import com.codestates.member.mapper.MemberMapper;
import com.codestates.member.repository.MemberRepository;
import com.codestates.member.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpMethod;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static com.codestates.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = MemberController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class MemberControllerDocumentationTest implements MemberControllerTestHelper {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemberRepository memberRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper mapper;

    @BeforeEach
    public void setup() {
        Member member = new Member(1L, "csytest1", "user", passwordEncoder.encode("1234qwer"));
        member.setRoles("ROLE_USER");
        memberRepository.save(member);
        Member user = memberRepository.findByMemberName("user");


        PrincipalDetails principalDetails = new PrincipalDetails(member);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member.getMemberName(), member.getPassword(), List.of(new SimpleGrantedAuthority("USER")));
//        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    @Test
    public void postMemberTest() throws Exception {
        MemberPostDto post = (MemberPostDto) MemberStubData.MockMember.getRequestBody(HttpMethod.POST);
        String content = toJsonContent(post);

        MemberResponseDto responseBody = MemberStubData.MockMember.getSingleResponseBody();

        given(mapper.memberPostDtoToMember(Mockito.any(MemberPostDto.class))).willReturn(new Member());

        given(memberService.createMember(Mockito.any(Member.class))).willReturn(new Member());

        given(mapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(responseBody);

        // when
        ResultActions actions = mockMvc.perform(postRequestBuilder(getUrl() + "/signup", content));

        // then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.memberName").value(post.getMemberName()))
                .andExpect(jsonPath("$.nickname").value(post.getNickname()))
//                .andExpect(jsonPath("$.data.phone").value(post.getPhone()))
                .andDo(document("post-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultMemberPostRequestDescriptors())
                        ,
                        responseFields(
                                getFullResponseDescriptors(
                                        getDefaultMemberResponseDescriptors(DataResponseType.SINGLE)
                                )
                        )));
    }

    @Test
    public void patchMemberTest() throws Exception {
        // given
        long memberId = 1L;
        MockMultipartFile image = new MockMultipartFile("multipartFile", "image.png", "image/png",
                "<<png data>>".getBytes());
        MemberPatchDto patch = (MemberPatchDto) MemberStubData.MockMember.getRequestBody(HttpMethod.PATCH);
        String content = toJsonContent(patch);

        MemberResponseDto responseDto = MemberStubData.MockMember.getSingleResponseBody();

        // willReturn() 이 최소한 null 은 아니어야 한다.
        given(mapper.memberPatchDtoToMember(Mockito.any(MemberPatchDto.class))).willReturn(new Member());

        given(memberService.updateMember(Mockito.any(Member.class))).willReturn(new Member());

        given(mapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(responseDto);

        // when
//        ResultActions actions = mockMvc.perform(postwithVariableRequestBuilder(getURI(), memberId, content));
        ResultActions actions = mockMvc.perform(multipart(getURI(), memberId)
                        .file(image)
                        .content(content)
                .with(csrf())
        );

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.memberId").value(patch.getMemberId()))
                .andExpect(jsonPath("$.nickname").value(patch.getNickname()))
//                .andExpect(jsonPath("$.password").value(patch.getPassword()))
                .andExpect(jsonPath("$.memberStatus").value(patch.getMemberStatus().getStatus()))
                .andDo(document("patch-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                getMemberRequestPathParameterDescriptor()
                        ),
                        requestFields(
                                getDefaultMemberPatchRequestDescriptors()
                        ),
                        requestParts(
                                partWithName("multipartFile").description("프로필 이미지")
                        ),
                        responseFields(
                                getFullResponseDescriptors(
                                        getDefaultMemberResponseDescriptors(DataResponseType.SINGLE)
                                )
                        )
                ));
    }


    @Test
    public void getMemberTest() throws Exception {
        // given
        long memberId = 1L;
        MemberResponseDto response = MemberStubData.MockMember.getSingleResponseBody();

        given(memberService.findMember(Mockito.anyLong())).willReturn(new Member());
        given(mapper.memberToMemberResponseDto(Mockito.any(Member.class))).willReturn(response);

        // when
        ResultActions actions = mockMvc.perform(getRequestBuilder(getURI(), memberId));

        // then
        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.memberId").value(memberId))
                .andExpect(jsonPath("$.nickname").value(response.getNickname()))
                .andDo(
                        document("get-member",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getMemberRequestPathParameterDescriptor()
                                ),
                                responseFields(
                                        getFullResponseDescriptors(
                                                getDefaultMemberResponseDescriptors(DataResponseType.SINGLE)
                                        )
                                ))
                );
    }
}
