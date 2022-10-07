package com.codestates.favorite.repository;

import com.codestates.favorite.entity.Favorite;
import com.codestates.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Modifying
    @Query(value = "INSERT INTO favorite(product_id, member_id, creation_date, last_edit_date) VALUES(:productId, :principalId, now(), now())", nativeQuery = true)
    int mLikes(@Param("productId") long productId, @Param("principalId") long principalId);

    @Modifying
    @Query(value = "DELETE FROM favorite WHERE product_id = :productId AND member_id = :principalId", nativeQuery = true)
    int mUnLikes(@Param("productId") long productId, @Param("principalId") long principalId);

    /**
     * 관심 목록 조회를 위한 추가
     */
//    @Query(value = "SELECT * FROM favorite WHERE member_id = :memberId", nativeQuery = true)
//    Page<Favorite> findFavorite(@Param("memberid") long memberId, Pageable pageable);

    @Query(value = "SELECT * FROM favorite WHERE member_id = :memberId", nativeQuery = true)
    Optional<Page<Favorite>> findByMemberId(long memberId, Pageable pageable);
}
