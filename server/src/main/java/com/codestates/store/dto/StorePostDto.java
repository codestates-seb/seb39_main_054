package com.codestates.store.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class StorePostDto {

        private StorePostDetailDto storePostDetailDto;
        private List<MultipartFile> multipartFileList;

}
