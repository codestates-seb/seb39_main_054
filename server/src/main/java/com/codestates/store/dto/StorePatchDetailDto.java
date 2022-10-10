package com.codestates.store.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class StorePatchDetailDto {

    private Long storeId;
//    private Long memberId;
    @NotBlank(message = "제목을 입력해주세요")
    private String title;
    @NotBlank(message = "내용을 입력해주세요")
    private String description;
    private String scategoryName;
    private String address;
    private String phoneNumber;
}
