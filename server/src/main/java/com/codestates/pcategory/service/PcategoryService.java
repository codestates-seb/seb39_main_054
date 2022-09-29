package com.codestates.pcategory.service;

import com.codestates.exception.CustomException;
import com.codestates.member.entity.Member;
import com.codestates.pcategory.entity.Pcategory;
import com.codestates.pcategory.repository.PcategoryRepository;
import com.codestates.product.entity.Product;
import com.codestates.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PcategoryService {

    private final PcategoryRepository pcategoryRepository;

    public Pcategory findPcategory(String pcategoryName) {
        Optional<Pcategory> pcategory = pcategoryRepository.findByPcategoryName(pcategoryName);
        return pcategory.orElseThrow(() -> new CustomException("Category not Found", HttpStatus.NOT_FOUND));
    }

}
