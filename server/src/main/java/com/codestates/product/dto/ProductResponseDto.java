package com.codestates.product.dto;


import com.codestates.member.entity.Member;
import com.codestates.pcategory.entity.Pcategory;
import com.codestates.pimage.entity.Pimage;
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
        private List<String> imageUrlList;
    }


    @Getter
    @Builder
    @Setter
    public static class PATCH {
        private Long productId;
        private LocalDateTime creationDate;
        private LocalDateTime lastEditDate;
        private List<String> modifiedImageUrlList;
    }

    @Getter
    @Builder
    @Setter
    public static class DetailResponse {
        private Long productId;
        private String title;
        private String description;
        private String productStatus;
        private Long favoriteCount;
        private LocalDateTime creationDate;
        private LocalDateTime lastEditDate;
        private Pcategory pcategory;
        private Member member;
        private List<Pimage> pimageList;
    }
}