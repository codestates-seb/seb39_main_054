package com.codestates.store.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class StorePatchDto {

    private StorePatchDetailDto storePatchDetailDto;
    private List<String> imageUrlList;

}
