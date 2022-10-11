package com.codestates.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MessagePostDto {
    private long chatRoomId;
    private long memberId;
    private String content;
    private String nickname;
}
