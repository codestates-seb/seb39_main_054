package com.codestates.product.dto;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ProductDto {

    @Getter
    public static class Post {

        private ProductDetailDto.Post detailPost;
        private List<MultipartFile> multipartFileList;
    }

}
