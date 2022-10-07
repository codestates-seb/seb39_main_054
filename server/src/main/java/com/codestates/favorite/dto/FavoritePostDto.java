package com.codestates.favorite.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Positive;

@Getter
@Setter
public class FavoritePostDto {

    @Positive
    private long memberId;

    @Positive
    private long productId;

    public FavoritePostDto(long memberId, long productId) {
        this.memberId = memberId;
        this.productId = productId;
    }
}
