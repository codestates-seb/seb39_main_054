package com.codestates.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomResponseDto {
    private long id;
    private String roomId;
    private String name;
    private long productId;
    private long sellerId;
    private long buyerId;
}
