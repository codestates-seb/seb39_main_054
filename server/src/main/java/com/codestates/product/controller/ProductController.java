package com.codestates.product.controller;

import com.codestates.favorite.entity.Favorite;
import com.codestates.member.jwt.oauth.PrincipalDetails;
import com.codestates.pcategory.service.PcategoryService;
import com.codestates.pimage.entity.Pimage;
import com.codestates.product.dto.ProductPatchDto;
import com.codestates.product.dto.ProductPostDto;
import com.codestates.product.dto.ProductResponseDto;
import com.codestates.product.entity.Product;
import com.codestates.product.mapper.ProductMapper;
import com.codestates.product.service.ProductService;
import com.codestates.response.MultiResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/product")
@Validated
@Slf4j
@RequiredArgsConstructor
public class ProductController {

    private final ProductMapper mapper;
    private final ProductService productService;
    private final PcategoryService pcategoryService;

    /**
     * 제품 등록 // 토큰
     */
    @PostMapping
    public ResponseEntity postProduct(@ModelAttribute @Valid ProductPostDto request,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {


        List<String> imageUrlList = new ArrayList<>();

//        Long memberId = request.getProductPostDetailDto().getMemberId();
        Long memberId = principalDetails.getMember().getMemberId(); //
        Product product = mapper.postDetailDtoToProduct(request.getProductPostDetailDto(), pcategoryService);

        List<Pimage> pimageList = productService.uploadImage(request.getMultipartFileList(), imageUrlList);
        Product productPost = productService.createProduct(product, memberId, pimageList);

        ProductResponseDto.POST productResponseDto = mapper.productPostToProductResponseDto(productPost, imageUrlList);
        return new ResponseEntity(productResponseDto, HttpStatus.CREATED);
    }

    /**
     * 제품 수정 // 토큰
     */
    @PatchMapping("/{product-id}")
    public ResponseEntity patchProduct(@PathVariable("product-id") @Positive long productId,
                                      @ModelAttribute @Valid ProductPatchDto request,
                                       @AuthenticationPrincipal PrincipalDetails principalDetails) {
//                                      @AuthenticationPrincipal PrincipalDetails principalDetails

        request.getProductPatchDetailDto().setProductId(productId);
//        Long memberId = request.getProductPatchDetailDto().getMemberId();
        Long memberId = principalDetails.getMember().getMemberId(); //

        Product product = mapper.patchDetailDtoToProduct(request.getProductPatchDetailDto(), pcategoryService);
        Product productPatch = productService.updateProduct(product, memberId);

        List<String> modifiedImageUrlList = productService.updateImage(productPatch.getProductId(), request.getImageUrlList());

        ProductResponseDto.PATCH productResponseDto = mapper.productPatchToProductResponseDto(productPatch, modifiedImageUrlList);


        return new ResponseEntity<>(productResponseDto, HttpStatus.OK);
    }

    /**
     * 제품 삭제 // 토큰
     */
    @DeleteMapping("/{product-id}")
    public ResponseEntity deleteProduct(@PathVariable("product-id") @Positive Long productId,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Long memberId = principalDetails.getMember().getMemberId();
        productService.deleteQuestion(productId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 제품 상세조회 // 토큰 option
     */
    @GetMapping("/{product-id}")
    public ResponseEntity getProduct(@PathVariable("product-id") @Positive long productId,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Long memberId = principalDetails != null ? principalDetails.getMember().getMemberId() : 0L;

        Product product = productService.findProduct(productId, memberId);

        ProductResponseDto.DetailResponse productDetailResponseDto = mapper.productToProductDetailResponseDto(product);

        return new ResponseEntity<>(productDetailResponseDto, HttpStatus.OK);
    }

    /**
     * 제품 리스트 조회 (feat: 카테고리, 상태, 검색어) -> QueryDsl // 토큰 option
     */
    @GetMapping
    public ResponseEntity getProductList(@Positive @RequestParam(defaultValue = "1") int page,
                                         @Positive @RequestParam(defaultValue = "50") int size,
                                         @RequestParam @Nullable String pcategoryName,
                                         @RequestParam @Nullable Product.ProductStatus status,
                                         @RequestParam @Nullable String keyword,
                                         @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Long memberId = principalDetails != null ? principalDetails.getMember().getMemberId() : 0L;


        PageImpl<Product> pageProductList = productService.findProductList(page - 1, size,pcategoryName,status,keyword, memberId);
        List<Product> productList = pageProductList.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.productToProductResponseDtoList(productList), pageProductList),HttpStatus.OK);
    }

    /**
     * 유저가 등록한 리스트 //토큰
     */
    @GetMapping("/myList/{member-id}")
    public ResponseEntity getMemberProductList(@Positive @RequestParam(defaultValue = "1") int page,
                                               @Positive @RequestParam(defaultValue = "50") int size,
                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Long memberId = principalDetails.getMember().getMemberId();
        Page<Product> pageProductList = productService.findMemberList(page - 1, size,memberId);
        List<Product> productList = pageProductList.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.productToProductResponseDtoList(productList), pageProductList),HttpStatus.OK);
    }

    /**
     * 유저 관심(좋아요) 리스트 //토큰
     */
    @GetMapping("/myFavorite/{member-id}")
    public ResponseEntity getMemberProd22ctList(@Positive @RequestParam(defaultValue = "1") int page,
                                               @Positive @RequestParam(defaultValue = "50") int size,
                                                @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Long memberId = principalDetails.getMember().getMemberId();
        Page<Favorite> pageFavoriteList = productService.findFavoriteList(page - 1, size, memberId);
        List<Favorite> favoriteList = pageFavoriteList.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.favoriteToProductResponseDtoList(favoriteList, memberId), pageFavoriteList),HttpStatus.OK);
    }
}