package com.codestates.product.repository;

import com.codestates.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductRepositoryCustom {

    PageImpl<Product> findByCategoryStatusKeyword(String pcategoryName, Product.ProductStatus status, String Keyword, Pageable pageable);
//    Optional<Page<List<Product>>> findByCategoryStatusKeyword(String pcategoryName, String status, String Keyword, PageRequest pageRequest);

}
