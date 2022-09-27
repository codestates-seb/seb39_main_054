package com.codestates.helper;

import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;

import java.util.Arrays;
import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface MemberControllerTestHelper extends ControllerTestHelper {
    String MEMBER_URL = "/v1/members";
    String RESOURCE_URI = "/{member-id}";

    default String getUrl() {
        return MEMBER_URL;
    }

    default String getURI() {
        return MEMBER_URL + RESOURCE_URI;
    }

    default List<ParameterDescriptor> getMemberRequestPathParameterDescriptor() {
        return Arrays.asList(parameterWithName("member-id").description("회원 식별자 ID"));
    }

    default List<FieldDescriptor> getDefaultMemberResponseDescriptors(DataResponseType dataResponseType) {
        String parentPath = getDataParentPath(dataResponseType);
        return List.of(
                fieldWithPath(parentPath.concat("memberId")).type(JsonFieldType.NUMBER).description("회원 식별자"),
                fieldWithPath(parentPath.concat("memberName")).type(JsonFieldType.STRING).description("사용자ID"),
                fieldWithPath(parentPath.concat("nickname")).type(JsonFieldType.STRING).description("닉네임"),
                fieldWithPath(parentPath.concat("roles")).type(JsonFieldType.STRING).description("권한"),
                fieldWithPath(parentPath.concat("memberStatus")).type(JsonFieldType.STRING).description("상태"),
                fieldWithPath(parentPath.concat("imageName")).type(JsonFieldType.STRING).description("이미지파일 이름"),
                fieldWithPath(parentPath.concat("imageUrl")).type(JsonFieldType.STRING).description("이미지파일 주소"),
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

    default List<FieldDescriptor> getDefaultMemberPatchRequestDescriptors() {
        return List.of(
                fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자").ignored(),
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호").optional(),
                fieldWithPath("nickname").type(JsonFieldType.STRING).description("닉네임").optional(),
                fieldWithPath("memberStatus").type(JsonFieldType.STRING).description("회원 상태: MEMBER_ACTIVE(활동중) / MEMBER_SLEEP(휴면 계정) / MEMBER_QUIT(탈퇴)").optional()
        );
    }
}
