package com.codestates.helper;

import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;

import java.util.Arrays;
import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface FavoriteControllerTestHelper extends ControllerTestHelper {
    String FAVORITE_URL = "/v1/favorites";
    String RESOURCE_URI = "/{product-id}";

    default String getUrl() {
        return FAVORITE_URL;
    }

    default String getURI() {
        return FAVORITE_URL + RESOURCE_URI;
    }

    default List<ParameterDescriptor> getFavoriteRequestPathParameterDescriptor() {
        return List.of(parameterWithName("product-id").description("물품 식별자"));
    }

    default List<FieldDescriptor> getDefaultFavoriteResponseDescriptors(DataResponseType dataResponseType) {
        String parentPath = getDataParentPath(dataResponseType);
        return List.of(
                fieldWithPath(parentPath.concat("favoriteId")).type(JsonFieldType.NUMBER).description("관심 식별자"),
                fieldWithPath(parentPath.concat("memberId")).type(JsonFieldType.NUMBER).description("회원 식별자"),
                fieldWithPath(parentPath.concat("productId")).type(JsonFieldType.NUMBER).description("물품 식별자"),
                fieldWithPath(parentPath.concat("creationDate")).type(JsonFieldType.STRING).description("생성일시"),
                fieldWithPath(parentPath.concat("lastEditDate")).type(JsonFieldType.STRING).description("수정일시")
        );
    }

    default List<FieldDescriptor> getDefaultFavoritePostRequestDescriptors() {
        return List.of(
                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                fieldWithPath("productId").type(JsonFieldType.NUMBER).description("물품 식별자")
        );
    }

    default List<FieldDescriptor> getDefaultMemberPatchRequestDescriptors() {
        return List.of(
                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자").ignored(),
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호").optional(),
                fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임").optional(),
                fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("회원 상태: MEMBER_ACTIVE(활동중) / MEMBER_SLEEP(휴면 계정) / MEMBER_QUIT(탈퇴)").optional()
        );
    }
}
