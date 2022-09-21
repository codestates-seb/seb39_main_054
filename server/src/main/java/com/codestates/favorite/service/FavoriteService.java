package com.codestates.favorite.service;

import com.codestates.favorite.dto.FavoriteResponseDto;
import com.codestates.favorite.entity.Favorite;
import com.codestates.favorite.repository.FavoriteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    @Transactional
    public void createFavorite(long productId, long memberId) {
        favoriteRepository.mLikes(productId, memberId);
    }
}
