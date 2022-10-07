package com.codestates.chat.dto;

import lombok.Getter;

import javax.validation.constraints.Positive;

@Getter
public class ChatRoomPostDto {
    @Positive
    private long sellerId;

    @Positive
    private long buyerId;

    @Positive
    private long productId;

}
