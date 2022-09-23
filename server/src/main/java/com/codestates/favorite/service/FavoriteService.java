package com.codestates.favorite.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.favorite.dto.FavoriteResponseDto;
import com.codestates.favorite.entity.Favorite;
import com.codestates.favorite.repository.FavoriteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    public void deleteFavorite(long favoriteId) {
        Favorite findFavorite = findVerifiedFavorite(favoriteId);
        
        favoriteRepository.delete(findFavorite);
    }

    @Transactional(readOnly = true)
    public Favorite findVerifiedFavorite(long favoriteId) {
        Optional<Favorite> optionalFavorite = favoriteRepository.findById(favoriteId);
        Favorite findFavorite = optionalFavorite.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FAVORITE_NOT_FOUND));
        return findFavorite;
    }
}
