package com.codestates.product.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class ProductResponseDto {

    @Getter
    @Builder
    @Setter
    public static class POST {
        private Long productId;
        private LocalDateTime creationDate;
        private LocalDateTime lastEditDate;
        private List<String> fileUrlList;
    }
}