package com.codestates.product.mapper;

import com.codestates.pcategory.service.PcategoryService;
import com.codestates.product.dto.ProductPatchDetailDto;
import com.codestates.product.dto.ProductPostDetailDto;
import com.codestates.product.dto.ProductResponseDto;
import com.codestates.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Optional;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    default Product postDetailDtoToProduct(ProductPostDetailDto productPostDetailDto, PcategoryService pcategoryService) {
        Product product = new Product();
        product.setTitle(productPostDetailDto.getTitle());
        product.setDescription(productPostDetailDto.getDescription());
        product.setPcategory(pcategoryService.findPcategory(productPostDetailDto.getPcategoryName()));
        return product;
    }

    default Product patchDetailDtoToProduct(ProductPatchDetailDto productPatchDetailDto, PcategoryService pcategoryService) {
        Product product = new Product();
        product.setProductId(productPatchDetailDto.getProductId());
        product.setTitle(productPatchDetailDto.getTitle());
        product.setDescription(productPatchDetailDto.getDescription());
        product.setProductStatus(productPatchDetailDto.getProductStatus());
        Optional.ofNullable(productPatchDetailDto.getPcategoryName()).
                ifPresent(pcategoryName -> product.setPcategory(pcategoryService.findPcategory(pcategoryName)));
        return product;
    }

    ProductResponseDto.POST ProductPostToProductResponseDto(Product product, List<String> imageUrlList);
    ProductResponseDto.PATCH ProductPatchToProductResponseDto(Product product, List<String> modifiedImageUrlList);

    ProductResponseDto.DetailResponse ProductToProductDetailResponseDto(Product product);



}
