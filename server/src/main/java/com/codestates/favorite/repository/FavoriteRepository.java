package com.codestates.favorite.repository;

import com.codestates.favorite.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Modifying
    @Query(value = "INSERT INTO favorite(product_id, member_id, creation_date) VALUES(:productId, :principalId, now())", nativeQuery = true)
    int mLikes(@Param("productId") long productId, @Param("principalId") long principalId);

    @Modifying
    @Query(value = "DELETE FROM favorite WHERE product_id = :productId AND member_id = :principalId", nativeQuery = true)
    int mUnLikes(@Param("productId") int productId, @Param("principalId") int principalId);
}
