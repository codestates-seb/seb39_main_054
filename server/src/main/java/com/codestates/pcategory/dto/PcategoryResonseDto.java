package com.codestates.pcategory.dto;

import com.codestates.audit.Auditable;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PcategoryResonseDto {
    private Long pcategoryId;
    private String pcategoryName;
}
