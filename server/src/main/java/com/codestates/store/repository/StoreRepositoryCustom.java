package com.codestates.store.repository;

import com.codestates.store.entity.Store;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public interface StoreRepositoryCustom {

    PageImpl<Store> findByCategoryKeyword(String scategoryName, String Keyword, Pageable pageable);

}
