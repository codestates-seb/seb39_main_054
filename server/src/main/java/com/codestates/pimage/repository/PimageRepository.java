package com.codestates.pimage.repository;

import com.codestates.pimage.entity.Pimage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PimageRepository extends JpaRepository<Pimage,Long> {

}
