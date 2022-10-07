package com.codestates.product.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class ProductPatchDto {

    private ProductPatchDetailDto productPatchDetailDto;
    private List<String> imageUrlList;

}
