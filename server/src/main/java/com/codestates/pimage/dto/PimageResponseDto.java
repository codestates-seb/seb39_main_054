package com.codestates.pimage.dto;

import com.codestates.audit.Auditable;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class PimageResponseDto {
    private Long pimageId;
    private String imageUrl;
}
