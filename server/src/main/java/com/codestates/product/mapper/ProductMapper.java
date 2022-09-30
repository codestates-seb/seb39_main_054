package com.codestates.product.mapper;

import com.codestates.member.dto.MemberResponseDto;
import com.codestates.member.entity.Member;
import com.codestates.member.mapper.MemberMapper;
import com.codestates.pcategory.dto.PcategoryResonseDto;
import com.codestates.pcategory.entity.Pcategory;
import com.codestates.pcategory.service.PcategoryService;
import com.codestates.pimage.dto.PimageResponseDto;
import com.codestates.pimage.entity.Pimage;
import com.codestates.product.dto.ProductPatchDetailDto;
import com.codestates.product.dto.ProductPostDetailDto;
import com.codestates.product.dto.ProductResponseDto;
import com.codestates.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {MemberMapper.class})
public interface ProductMapper {

    default Product postDetailDtoToProduct(ProductPostDetailDto productPostDetailDto, PcategoryService pcategoryService) {
        Product product = new Product();
        product.setTitle(productPostDetailDto.getTitle());
        product.setDescription(productPostDetailDto.getDescription());
//        product.setPcategory(pcategoryService.findVerifiedPcategory(productPostDetailDto.getPcategoryName()));
        product.setPcategory(pcategoryService.createPcategory(productPostDetailDto.getPcategoryName()));
        return product;
    }

    default Product patchDetailDtoToProduct(ProductPatchDetailDto productPatchDetailDto, PcategoryService pcategoryService) {
        Product product = new Product();
        product.setProductId(productPatchDetailDto.getProductId());
        product.setTitle(productPatchDetailDto.getTitle());
        product.setDescription(productPatchDetailDto.getDescription());
        product.setProductStatus(productPatchDetailDto.getProductStatus());
        Optional.ofNullable(productPatchDetailDto.getPcategoryName()).
//                ifPresent(pcategoryName -> product.setPcategory(pcategoryService.findVerifiedPcategory(pcategoryName)));
        ifPresent(pcategoryName -> product.setPcategory(pcategoryService.createPcategory(pcategoryName)));
        return product;
    }

    ProductResponseDto.POST productPostToProductResponseDto(Product product, List<String> imageUrlList);

    ProductResponseDto.PATCH productPatchToProductResponseDto(Product product, List<String> modifiedImageUrlList);

    default ProductResponseDto.DetailResponse productToProductDetailResponseDto(Product product) {
        System.out.println("product.getProductId()1 :" + product.getProductId());
        System.out.println("product.getProductId()1 :" + product.getPcategory().getPcategoryName());

        ProductResponseDto.DetailResponse response = ProductResponseDto.DetailResponse.builder()
                .productId(product.getProductId())
                .title(product.getTitle())
                .description(product.getDescription())
                .productStatus(product.getProductStatus())
                .favoriteCount(product.getFavoriteCount())
                .creationDate(product.getCreationDate())
                .lastEditDate(product.getLastEditDate())
                .pcategory(pcategoryToPcategoryResponse(product.getPcategory()))
                .member(memberToMemberResponseDto(product.getMember()))
                .pimageList(pimageListToPimageResponseDtoList(product.getPimageList()))
                .build();
        System.out.println("product.getProductId()2 :" + response.getProductId());
        return response;
    }

    PcategoryResonseDto pcategoryToPcategoryResponse(Pcategory pcategory);
    MemberResponseDto memberToMemberResponseDto(Member member);


    default List<PimageResponseDto> pimageListToPimageResponseDtoList(List<Pimage> pimageList) {
        return pimageList.stream()
                .map(image -> PimageResponseDto.builder()
                                .pimageId(image.getPimageId())
                                .imageUrl(image.getImageUrl())
                                .build())
                .collect(Collectors.toList());
    }

    List<ProductResponseDto.DetailResponse> productToProductResponseDtoList(List<Product> questions);

}