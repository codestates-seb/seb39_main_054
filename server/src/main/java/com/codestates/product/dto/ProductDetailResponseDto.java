package com.codestates.product.dto;

import com.codestates.member.dto.MemberResponseDto;
import com.codestates.pcategory.dto.PcategoryResonseDto;
import com.codestates.pimage.dto.PimageResponseDto;
import com.codestates.product.entity.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
public class ProductDetailResponseDto {

    private Long productId;
    private String title;
    private String description;
    private Product.ProductStatus productStatus;
    private Long favoriteCount;
    private LocalDateTime creationDate;
    private LocalDateTime lastEditDate;
    private PcategoryResonseDto pcategory;
    private MemberResponseDto member;
    private List<PimageResponseDto> pimageList;
}
