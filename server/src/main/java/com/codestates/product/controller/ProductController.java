package com.codestates.product.controller;

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
import com.codestates.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    @PostMapping
    public ResponseEntity postProduct(@ModelAttribute @Valid ProductPostDto request,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {

        List<String> imageUrlList = new ArrayList<>();

        System.out.println("imageUrlList 01 :" + imageUrlList);

        Long memberId = request.getProductPostDetailDto().getMemberId();
        Product product = mapper.postDetailDtoToProduct(request.getProductPostDetailDto(), pcategoryService);
//      Long memberId = principalDetails.getMember().getMemberId(); // Todo: 9/27 배포 전, Security config 수정해야하고 PrincipalDetails로 수정 필요함

        List<Pimage> pimageList = productService.uploadImage(request.getMultipartFileList(), imageUrlList);
        System.out.println("imageUrlList 02 :" + imageUrlList);
        Product productPost = productService.createProduct(product, memberId, pimageList);

        ProductResponseDto.POST productResponseDto = mapper.ProductPostToProductResponseDto(productPost, imageUrlList);
        System.out.println("imageUrlList 03 :" + imageUrlList);
        return new ResponseEntity(productResponseDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{product-id}")
    public ResponseEntity patchProduct(@PathVariable("product-id") @Positive long productId,
                                      @ModelAttribute @Valid ProductPatchDto request,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {

        System.out.println("request.getFileUrlList() : " + request.getImageUrlList());

        request.getProductPatchDetailDto().setProductId(productId);
        Long memberId = request.getProductPatchDetailDto().getMemberId();
        //      Long memberId = principalDetails.getMember().getMemberId(); // Todo: 9/27 배포 전, Security config 수정해야하고 PrincipalDetails로 수정 필요함

        Product product = mapper.patchDetailDtoToProduct(request.getProductPatchDetailDto(), pcategoryService);

        Product productPatch = productService.updateProduct(product, memberId);
        List<String> modifiedImageUrlList = productService.updateImage(productPatch.getProductId(), request.getImageUrlList());

        ProductResponseDto.PATCH productResponseDto = mapper.ProductPatchToProductResponseDto(productPatch, modifiedImageUrlList);


        return new ResponseEntity<>(productResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{product-id}")
    public ResponseEntity deleteProduct(@PathVariable("product-id") @Positive Long productId,
                                         @RequestParam("memberId") Long memberId,
                                         @AuthenticationPrincipal PrincipalDetails principalDetails) {

//        Long memberId = principalDetails.getMember().getMemberId();
        productService.deleteQuestion(productId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{product-id}")
    public ResponseEntity getProduct(@PathVariable("product-id") @Positive long productId) {

        ProductResponseDto.DetailResponse productDetailResponseDto = productService.findProduct(productId);
        System.out.println("product.getMember().getMemberId()3 :" + productDetailResponseDto.getMember().getMemberId());
        System.out.println("product.getMember().getDescription()3 :" +productDetailResponseDto.getDescription());
        System.out.println("product.getMember().getPcategoryName()3 :" +productDetailResponseDto.getPcategory().getPcategoryName());
        System.out.println("product.getMember().getPcategoryId()3 :" +productDetailResponseDto.getPcategory().getPcategoryId());
        System.out.println("product.getMember().getProductList()3 :" +productDetailResponseDto.getPcategory().getProductList());

        productDetailResponseDto.getPimageList().stream()
                .forEach(s -> System.out.println(s.getImageUrl()));


        return new ResponseEntity<>(new SingleResponseDto<>(productDetailResponseDto), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getQuestions(@Positive @RequestParam(defaultValue = "1") int page,
//                                       @Positive @RequestParam(defaultValue = "50") int size) {
//        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
//        List<Question> questions = pageQuestions.getContent();
//
//        return new ResponseEntity<>(
//                new MultiResponseDto<>(mapper.questionToQuestionResponseDtos(questions), pageQuestions),HttpStatus.OK);
//    }


}