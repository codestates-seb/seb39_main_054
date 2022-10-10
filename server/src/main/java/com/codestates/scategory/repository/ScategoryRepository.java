package com.codestates.scategory.repository;

import com.codestates.scategory.entity.Scategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ScategoryRepository extends JpaRepository<Scategory,Long> {

    @Query(value = "select * from scategory where scategory_name = :scategoryName", nativeQuery = true)
    Optional<Scategory> findByScategoryName(String scategoryName);
}