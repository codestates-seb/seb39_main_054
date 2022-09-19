package com.codestates.member.dto;

import com.codestates.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberPatchDto {

    private Long memberId;

    private String nickname;

    private String password;

    private Member.MemberStatus memberStatus;

}
