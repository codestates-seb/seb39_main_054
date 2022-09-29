package com.codestates.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MessageDto {
    private String roomId;
    private String writer;
    private String message;
}
