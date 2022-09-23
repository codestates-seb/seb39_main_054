package com.codestates.product.controller;

import com.codestates.member.entity.Member;
import com.codestates.product.dto.ProductDetailDto;
import com.codestates.product.dto.ProductDto;
import com.codestates.product.entity.Product;
import com.codestates.product.mapper.ProductMapper;
import com.codestates.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("v1/product")
@Validated
public class ProductController {

    private final ProductMapper mapper;
    private final ProductService productService;



    public ProductController(ProductMapper mapper, ProductService productService) {
        this.mapper = mapper;
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity postProduct(@ModelAttribute @Valid ProductDto.Post request,
                                      @AuthenticationPrincipal Member member) {

        Product product = mapper.postToProduct(request);
        Long memberId = member.getMemberId();

        productService.createProduct(product, memberId);
        List<String> fileUrlList = productService.uploadImage(request.getMultipartFileList());


    }







    @PatchMapping
    public ResponseEntity patchProduct(@RequestBody @Valid ProductDetailDto.Patch requestBody,
                                       @AuthenticationPrincipal Member member) {

    }





}
