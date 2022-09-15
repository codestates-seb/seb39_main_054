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

    private LocalDateTime creationDate;

    private LocalDateTime lastEditDate;
}
