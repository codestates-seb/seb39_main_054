package com.codestates.restdocs;

import com.codestates.favorite.controller.FavoriteController;
import com.codestates.favorite.dto.FavoritePostDto;
import com.codestates.favorite.dto.FavoriteResponseDto;
import com.codestates.favorite.entity.Favorite;
import com.codestates.favorite.mapper.FavoriteMapper;
import com.codestates.favorite.service.FavoriteService;
import com.codestates.helper.FavoriteControllerTestHelper;
import com.codestates.helper.FavoriteStubData;
import com.codestates.member.entity.Member;
import com.codestates.member.jwt.oauth.PrincipalDetails;
import com.codestates.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.codestates.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.codestates.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = FavoriteController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
//@WithUserDetails
public class FavoriteControllerDocumentationTest implements FavoriteControllerTestHelper {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemberRepository memberRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @MockBean
    private FavoriteService favoriteService;

    @MockBean
    private FavoriteMapper mapper;

    @MockBean
    private AuthenticationManager authenticationManager;

    @BeforeEach
    public void setup() {
        Member member = new Member(1L, "csytest1", "user", passwordEncoder.encode("1234qwer"));
        member.setRoles("ROLE_USER");
        memberRepository.save(member);

        PrincipalDetails principalDetails = new PrincipalDetails(member);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(member.getMemberName(), member.getPassword(), List.of(new SimpleGrantedAuthority("USER")));
//        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    @Test
//    @WithUserDetails
//    @WithMockUser(roles = "ADMIN")
    public void postFavoriteTest() throws Exception {
        long productId = 1;
        FavoritePostDto post = (FavoritePostDto) FavoriteStubData.MockFavorite.getRequestBody(HttpMethod.POST);
        String content = toJsonContent(post);

        FavoriteResponseDto responseBody = FavoriteStubData.MockFavorite.getSingleResponseBody();

        given(mapper.favoritePostDtoToFavorite(Mockito.any(FavoritePostDto.class))).willReturn(new Favorite());

//        given(favoriteService.createFavorite(Mockito.any(Favorite.class))).willReturn(new Favorite());

        given(mapper.favoriteToFavoriteResponseDto(Mockito.any(Favorite.class))).willReturn(responseBody);

        // when
        ResultActions actions = mockMvc.perform(postwithVariableRequestBuilder(getURI(), productId, content));

        // then
        actions.andExpect(status().isCreated())
                .andExpect(jsonPath("$.memberId").value(post.getMemberId()))
                .andExpect(jsonPath("$.productId").value(post.getProductId()))
//                .andExpect(jsonPath("$.data.phone").value(post.getPhone()))
                .andDo(document("post-favorite",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultFavoritePostRequestDescriptors())
                        ,
                        responseFields(
                                getFullResponseDescriptors(
                                        getDefaultFavoriteResponseDescriptors(DataResponseType.SINGLE)
                                )
                        )));
    }

//    @Test
//    public void getFavoriteTest() throws Exception {
//        // given
//        long favoriteId = 1L;
//        FavoriteResponseDto response = StubData.MockFavorite.getSingleResponseBody();
//
//        given(favoriteService.findFavorite(Mockito.anyLong())).willReturn(new Favorite());
//        given(mapper.favoriteToFavoriteResponseDto(Mockito.any(Favorite.class))).willReturn(response);
//
//        // when
//        ResultActions actions = mockMvc.perform(getRequestBuilder(getURI(), favoriteId));
//
//        // then
//        actions.andExpect(status().isOk())
//                .andExpect(jsonPath("$.memberId").value(memberId))
//                .andExpect(jsonPath("$.nickname").value(response.getNickname()))
//                .andDo(
//                        document("get-member",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(
//                                        getFavoriteRequestPathParameterDescriptor()
//                                ),
//                                responseFields(
//                                        getFullResponseDescriptors(
//                                                getDefaultFavoriteResponseDescriptors(DataResponseType.SINGLE)
//                                        )
//                                ))
//                );
//    }
}
