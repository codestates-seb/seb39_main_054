package com.codestates.product.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class ProductPostDto {

        private ProductPostDetailDto productPostDetailDto;
        private List<MultipartFile> multipartFileList;

}
