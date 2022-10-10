package com.codestates.scategory.service;

import com.codestates.exception.CustomException;
import com.codestates.scategory.entity.Scategory;
import com.codestates.scategory.repository.ScategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ScategoryService {

    private final ScategoryRepository scategoryRepository;

    public Scategory createScategory(String scategoryName) {

        if (scategoryRepository.findByScategoryName(scategoryName).isEmpty()) {
            Scategory scategory = new Scategory();
            scategory.setScategoryName(scategoryName);
            return scategoryRepository.save(scategory);
        } else {
            Scategory verifiedScategory = findVerifiedScategory(scategoryName);
            verifiedScategory.getStoreList().stream().forEach(store -> System.out.println("Category n123123d" + store.getStoreId()));

            return verifiedScategory;
        }
    }

    public Scategory findVerifiedScategory(String scategoryName) {
        Optional<Scategory> scategory = scategoryRepository.findByScategoryName(scategoryName);
        return scategory.orElseThrow(() -> new CustomException("Category not Found", HttpStatus.NOT_FOUND));
    }
}
