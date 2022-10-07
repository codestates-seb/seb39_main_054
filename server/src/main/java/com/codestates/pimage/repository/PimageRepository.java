package com.codestates.pimage.repository;

import com.codestates.pimage.entity.Pimage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PimageRepository extends JpaRepository<Pimage,Long> {

    @Query(value = "select * from pimage where product_id = :productId", nativeQuery = true)
    Optional<List<Pimage>> findByProductId(long productId);
}
