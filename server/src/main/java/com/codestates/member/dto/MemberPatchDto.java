package com.codestates.member.dto;

import com.codestates.member.entity.Member;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class MemberPatchDto {

    private Long memberId;

    private String nickname;

    private String password;

    private Member.MemberStatus memberStatus;

    private MultipartFile multipartFile;

    public MemberPatchDto(Long memberId, String nickname, String password, Member.MemberStatus memberStatus, MultipartFile multipartFile) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.password = password;
        this.memberStatus = memberStatus;
        this.multipartFile = multipartFile;
    }
}
