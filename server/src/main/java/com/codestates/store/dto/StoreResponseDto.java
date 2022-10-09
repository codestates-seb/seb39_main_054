package com.codestates.store.dto;


import com.codestates.member.dto.MemberResponseDto;
import com.codestates.scategory.dto.ScategoryResonseDto;
import com.codestates.simage.dto.SimageResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class StoreResponseDto {

    @Getter
    @Builder
    @Setter
    public static class POST {
        private Long storeId;
        private LocalDateTime creationDate;
        private LocalDateTime lastEditDate;
        private List<String> imageUrlList;
    }


    @Getter
    @Builder
    @Setter
    public static class PATCH {
        private Long storeId;
        private LocalDateTime creationDate;
        private LocalDateTime lastEditDate;
        private List<String> modifiedImageUrlList;
    }

    @Getter
    @Builder
    @Setter
    public static class DetailResponse {
        private Long storeId;
        private String title;
        private String description;
        private String address;
        private String phoneNumber;
        private LocalDateTime creationDate;
        private LocalDateTime lastEditDate;
        private ScategoryResonseDto scategory;
        private MemberResponseDto member;
        private List<SimageResponseDto> simageList;
    }
}