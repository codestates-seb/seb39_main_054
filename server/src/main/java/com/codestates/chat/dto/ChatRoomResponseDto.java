package com.codestates.chat.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatRoomResponseDto {
    private long id;
    private String roomId;
    private String name;
    private long productId;
    private long sellerId;
    private long buyerId;
    private LocalDateTime creationDate;
    private LocalDateTime lastEditDate;
}
