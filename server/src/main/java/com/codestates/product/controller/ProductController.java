package com.codestates.product.controller;

import com.codestates.member.jwt.oauth.PrincipalDetails;
import com.codestates.pcategory.entity.Pcategory;
import com.codestates.pcategory.service.PcategoryService;
import com.codestates.product.dto.ProductPostDto;
import com.codestates.product.dto.ProductResponseDto;
import com.codestates.product.entity.Product;
import com.codestates.product.mapper.ProductMapper;
import com.codestates.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity test(@ModelAttribute @Valid ProductPostDto request,
                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {

        System.out.println(request.getProductPostDetailDto());
        System.out.println(request.getProductPostDetailDto().getTitle());
        for (MultipartFile tmp : request.getMultipartFileList()) {
            System.out.println(tmp.getOriginalFilename());
        }


        Product product = mapper.postDetailDtoToProduct(request.getProductPostDetailDto(),pcategoryService);
        Long memberId = request.getMemberId();
        //        Long memberId = principalDetails.getMember().getMemberId();

        Product productResponse = productService.createProduct(product, memberId);
        List<String> fileUrlList = productService.uploadImage(request.getMultipartFileList(), productResponse.getProductId());

        ProductResponseDto.POST productResponseDto = mapper.ProductUrlToProductResponseDto(productResponse, fileUrlList);

        return new ResponseEntity(productResponseDto, HttpStatus.CREATED);
    }
}