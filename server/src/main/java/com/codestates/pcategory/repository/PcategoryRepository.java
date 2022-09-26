package com.codestates.pcategory.repository;

import com.codestates.pcategory.entity.Pcategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PcategoryRepository extends JpaRepository<Pcategory,Long> {

    @Query(value = "select * from pcategory where pcategory_name = :pcategoryName", nativeQuery = true)
    Optional<Pcategory> findByPcategoryName(String pcategoryName);
}