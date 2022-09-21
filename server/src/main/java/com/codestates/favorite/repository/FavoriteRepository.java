package com.codestates.favorite.repository;

import com.codestates.favorite.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    @Modifying
    @Query(value = "INSERT INTO likes(imageId, userId, createDate) VALUES(:imageId, :principalId, now())", nativeQuery = true)
    int mLikes(@Param("imageId") long imageId, @Param("principalId") long principalId);

    @Modifying
    @Query(value = "DELETE FROM likes WHERE imageId = :imageId AND userId = :principalId", nativeQuery = true)
    int mUnLikes(@Param("imageId") int imageId, @Param("principalId") int principalId);
}
