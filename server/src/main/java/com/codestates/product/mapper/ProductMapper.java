package com.codestates.product.mapper;

import com.codestates.favorite.entity.Favorite;
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
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
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

    @IterableMapping(qualifiedByName = "defaultD2E")
    default ProductResponseDto.DetailResponse productToProductDetailResponseDto(Product product) {
//        System.out.println("product.getProductId()1 :" + product.getProductId());
//        System.out.println("product.getProductId()1 :" + product.getPcategory().getPcategoryName());
//        product.getPimageList().stream().forEach(image -> System.out.println("product.getProductId()1 : " + image.getImageUrl()));

        ProductResponseDto.DetailResponse response = ProductResponseDto.DetailResponse.builder()
                .productId(product.getProductId())
                .title(product.getTitle())
                .description(product.getDescription())
                .productStatus(product.getProductStatus())
                .favoriteStatus(product.isFavoriteStatus())
                .favoriteCount(product.getFavoriteCount())
                .creationDate(product.getCreationDate())
                .lastEditDate(product.getLastEditDate())
                .pcategory(pcategoryToPcategoryResponse(product.getPcategory()))
                .member(memberToMemberResponseDto(product.getMember()))
                .pimageList(pimageListToPimageResponseDtoList(product.getPimageList()))
                .build();
//        System.out.println("product.getProductId()2 :" + response.getProductId());
        return response;
    }

    PcategoryResonseDto pcategoryToPcategoryResponse(Pcategory pcategory);
    @Named("defaultE2D")
    MemberResponseDto memberToMemberResponseDto(Member member);


    default List<PimageResponseDto> pimageListToPimageResponseDtoList(List<Pimage> pimageList) {

        List<PimageResponseDto> pimageResponseDtoList = new ArrayList<>();

        pimageResponseDtoList =  pimageList.stream()
                .map(image -> PimageResponseDto.builder()
                        .pimageId(image.getPimageId())
                        .imageUrl(image.getImageUrl())
                        .build())
                .collect(Collectors.toList());

        pimageResponseDtoList.stream().forEach(List -> System.out.println("List.getPimageId() : " + List.getPimageId()));

        return pimageResponseDtoList;
    }

    List<ProductResponseDto.DetailResponse> productToProductResponseDtoList(List<Product> productList);

//    List<ProductResponseDto.DetailResponse> favoriteToProductResponseDtoList(List<Favorite> favoriteList);

    PcategoryResonseDto pcategoryToPcategoryResponseDto(Pcategory pcategory);


    List<Product> favoriteListToProductList(List<Favorite> favoriteList);

    List<ProductResponseDto.DetailResponse> productListToProductResponseDtoDetailResponseList (List<Product> productList);

//    List<ProductResponseDto.DetailResponse> favoriteToProductResponseDtoList(List<Favorite> favoriteList);
    default List<ProductResponseDto.DetailResponse> favoriteToProductResponseDtoList(List<Favorite> favoriteList, Long memberId) {

        List<ProductResponseDto.DetailResponse> response = new ArrayList<>();

        response =  favoriteList.stream()
                .map(favorite -> ProductResponseDto.DetailResponse.builder()
                                .member(memberToMemberResponseDto(favorite.getMember()))
                                .productId(favorite.getProduct().getProductId())
                                .title(favorite.getProduct().getTitle())
                                .description(favorite.getProduct().getDescription())
                                .productStatus(favorite.getProduct().getProductStatus())
                                .favoriteCount(favorite.getProduct().getFavoriteCount())
                                .favoriteStatus(favorite.getProduct().isFavoriteStatus())
//                                .favoriteCount(favorite.getProduct().getFavoriteList().size())
//                                .favoriteStatus(favorite.getProduct().isFavoriteStatus())
                                .pcategory(pcategoryToPcategoryResponseDto(favorite.getProduct().getPcategory()))
                                .pimageList(pimageListToPimageResponseDtoList(favorite.getProduct().getPimageList()))
                                .creationDate(favorite.getCreationDate())
                                .lastEditDate(favorite.getLastEditDate())
                                .build())
                .collect(Collectors.toList());
        return response;

//                        .productId(favorite.getProduct().getProductId())
//                        .title(favorite.getProduct().getTitle())
//                        .description(favorite.getProduct().getDescription())
//                        .productStatus(favorite.getProduct().getProductStatus())
//                        .favoriteCount(favorite.getProduct().getFavoriteCount())
//                        .pcategory(pcategoryToPcategoryResponseDto(favorite.getProduct().getPcategory()))
//                        .member(memberToMemberResponseDto(favorite.getMember()))
//                        .pimageList(pimageListToPimageResponseDtoList(favorite.getProduct().getPimageList()))
//                        .build())
//                        .collect(Collectors.toList());

//        return response;
    }
}
