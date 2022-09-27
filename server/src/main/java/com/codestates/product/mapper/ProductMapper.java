package com.codestates.product.mapper;

import com.codestates.pcategory.service.PcategoryService;
import com.codestates.product.dto.ProductPostDetailDto;
import com.codestates.product.dto.ProductResponseDto;
import com.codestates.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;



@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ProductMapper {

    default Product postDetailDtoToProduct(ProductPostDetailDto productPostDetailDto, PcategoryService pcategoryService) {
        Product product = new Product();
        product.setTitle(productPostDetailDto.getTitle());
        product.setDescription(productPostDetailDto.getDescription());
        product.setPcategory(pcategoryService.findPcategory(productPostDetailDto.getPcategoryName()));
        return product;
    }


    ProductResponseDto.POST ProductUrlToProductResponseDto(Product product, List<String> fileUrlList);

}
