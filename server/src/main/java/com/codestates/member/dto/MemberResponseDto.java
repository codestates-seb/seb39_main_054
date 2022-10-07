package com.codestates.member.dto;

import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MemberResponseDto {

    private long memberId;

    private String memberName;

    private String nickname;

    private String roles; // User, MANAGER, ADMIN

    private Member.MemberStatus memberStatus;

    private String imageName;

    private String imageUrl;

    private LocalDateTime creationDate;

    private LocalDateTime lastEditDate;


    // response 에 "활동중" 으로 표시됨. 빼면 "MEMBER_ACTIVE 로 표시"
    public String getMemberStatus() {
        return memberStatus.getStatus();
    }

}
