package com.codestates.store.repository;

import com.codestates.store.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long>, StoreRepositoryCustom {

    @Query(value = "select * from store where member_id = :memberId", nativeQuery = true)
    Optional<Page<Store>> findByMemberId(long memberId, Pageable pageable);

}
