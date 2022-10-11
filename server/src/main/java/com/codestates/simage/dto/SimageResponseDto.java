package com.codestates.simage.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SimageResponseDto {
    private Long simageId;
    private String imageUrl;
}

// test