package com.codestates.product.dto;

import com.codestates.product.entity.Product;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ProductPatchDetailDto {

    private Long productId;
//    private Long memberId;
    @NotBlank(message = "제목을 입력해주세요")
    private String title;
    @NotBlank(message = "내용을 입력해주세요")
    private String description;
    private String pcategoryName;
    private Product.ProductStatus productStatus;
}
