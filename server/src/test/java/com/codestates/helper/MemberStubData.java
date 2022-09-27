package com.codestates.helper;

import com.codestates.favorite.dto.FavoriteResponseDto;
import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.dto.MemberResponseDto;
import com.codestates.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class MemberStubData {
    private static Map<HttpMethod, Object> stubRequestBody;
    static {
        stubRequestBody = new HashMap<>();
        stubRequestBody.put(HttpMethod.POST, new MemberPostDto("user", "password", "아이언맨"));
        stubRequestBody.put(HttpMethod.PATCH, new MemberPatchDto(1L, "아이언맨", "1234abcd#", Member.MemberStatus.MEMBER_ACTIVE));
    }

    public static class MockMember {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }

        public static MemberResponseDto getSingleResponseBody() {
            return new MemberResponseDto(1,
                    "user",
                    "아이언맨",
                    "ROLE_USER",
                    Member.MemberStatus.MEMBER_ACTIVE,
                    "test.jpg",
                    "https://mybucket-example-com.s3.amazonaws.com/userid/images/test.jpg",
                    LocalDateTime.now(),
                    LocalDateTime.now());
        }

        public static Member getSingleResultMember() {
            Member member = new Member("hgd@gmail.com", "홍길동", "010-1111-1111");
            member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);

            return member;
        }

        public static Page<Member> getMultiResultMember() {
            Member member1 = new Member("hgd1@gmail.com", "홍길동1", "010-1111-1111");
            member1.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);

            Member member2 = new Member("hgd2@gmail.com", "홍길동2", "010-2222-2222");
            member2.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);

            return new PageImpl<>(List.of(member1, member2),
                    PageRequest.of(0, 10, Sort.by("memberId").descending()),
                    2);
        }

        public static Member getSingleResultMember(long memberId) {
            Member member = new Member("hgd@gmail.com", "홍길동", "010-1111-1111");
            member.setMemberId(memberId);
            member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);
            return member;
        }

        public static Member getSingleResultMember(long memberId, Map<String, String> updatedInfo) {
            String name = Optional.ofNullable(updatedInfo.get("name")).orElse("홍길동");
            String phone = Optional.ofNullable(updatedInfo.get("phone")).orElse("010-1111-1111");
            Member member = new Member("hgd@gmail.com", name, phone);
            member.setMemberId(memberId);
            member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);

            return member;
        }
    }
}
