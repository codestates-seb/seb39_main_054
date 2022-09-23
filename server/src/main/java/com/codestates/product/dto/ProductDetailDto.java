package com.codestates.product.dto;

import com.codestates.pcategory.entity.Pcategory;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class ProductDetailDto {

    @Getter
    public static class Post {

        private Long memberId;
        @NotBlank(message = "제목을 입력해주세요")
        private String title;
        @NotBlank(message = "내용을 입력해주세요")
        private String description;
        private String pcategoryName;
    }
}
