package com.codestates.product.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class ProductDto {

    @Getter
    public static class Post {

        @NotBlank
        private Long memberId;

        private String title;
        private String image01;
        private String image02;
        private String image03;
        private String image04;
        private String image05;
        private String image06;
        private String pcategory;
    }
}
