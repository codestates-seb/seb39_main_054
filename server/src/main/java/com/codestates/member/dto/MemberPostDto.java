package com.codestates.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class MemberPostDto {


    @NotBlank
    private String memberName;

    @NotBlank
    private String password;

    @NotBlank
    private String nickname;

    private String roles; // User, MANAGER, ADMIN

    public MemberPostDto(String memberName, String password, String nickname) {
        this.memberName = memberName;
        this.password = password;
        this.nickname = nickname;
    }
}