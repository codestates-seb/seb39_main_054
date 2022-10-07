package com.codestates.product.repository;

import com.codestates.pimage.entity.Pimage;
import com.codestates.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {

    @Query(value = "select * from product where member_id = :memberId", nativeQuery = true)
    Optional<Page<Product>> findByMemberId(long memberId, Pageable pageable);

}
