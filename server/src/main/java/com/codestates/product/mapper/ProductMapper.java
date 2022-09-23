package com.codestates.product.mapper;

import com.codestates.pcategory.entity.Pcategory;
import com.codestates.product.dto.ProductDetailDto;
import com.codestates.product.dto.ProductDto;
import com.codestates.product.entity.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    default Product postToProduct(ProductDto.Post post) {

        Product product = Product.builder()
                .title(post.getDetailPost().getTitle())
                .description(post.getDetailPost().getDescription())
                .build();
        return product;
    }
}
