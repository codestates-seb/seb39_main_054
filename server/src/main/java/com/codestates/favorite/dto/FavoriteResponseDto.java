package com.codestates.favorite.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FavoriteResponseDto {

    private long favoriteId;

    private long memberId;

    private long productId;

    private LocalDateTime creationDate;

    private LocalDateTime lastEditDate;
}
