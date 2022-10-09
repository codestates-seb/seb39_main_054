package com.codestates.simage.repository;

import com.codestates.simage.entity.Simage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SimageRepository extends JpaRepository<Simage,Long> {

    @Query(value = "select * from simage where store_id = :storeId", nativeQuery = true)
    Optional<List<Simage>> findByStoreId(long storeId);
}
