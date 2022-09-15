package com.codestates.helper;

import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;

import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

public interface MemberControllerTestHelper extends ControllerTestHelper {
    String MEMBER_URL = "/v1/members";

    default String getUrl() {
        return MEMBER_URL;
    }

    default List<FieldDescriptor> getDefaultMemberResponseDescriptors(DataResponseType dataResponseType) {
        String parentPath = getDataParentPath(dataResponseType);
        return List.of(
                fieldWithPath(parentPath.concat("memberId")).type(JsonFieldType.NUMBER).description("회원 식별자"),
                fieldWithPath(parentPath.concat("memberName")).type(JsonFieldType.STRING).description("사용자ID"),
                fieldWithPath(parentPath.concat("nickname")).type(JsonFieldType.STRING).description("닉네임"),
                fieldWithPath(parentPath.concat("roles")).type(JsonFieldType.STRING).description("권한"),
                fieldWithPath(parentPath.concat("memberStatus")).type(JsonFieldType.STRING).description("상태"),
                fieldWithPath(parentPath.concat("creationDate")).type(JsonFieldType.STRING).description("생성일시"),
                fieldWithPath(parentPath.concat("lastEditDate")).type(JsonFieldType.STRING).description("수정일시")
        );
    }

    default List<FieldDescriptor> getDefaultMemberPostRequestDescriptors() {
        return List.of(
                fieldWithPath("memberName").type(JsonFieldType.STRING).description("사용자ID"),
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임")
        );
    }
}
