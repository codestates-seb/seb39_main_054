package com.codestates.favorite.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class FavoriteResponseDto {

    private long favoriteId;

    private long memberId;

    private long productId;

    private LocalDateTime creationDate;

    private LocalDateTime lastEditDate;
}
