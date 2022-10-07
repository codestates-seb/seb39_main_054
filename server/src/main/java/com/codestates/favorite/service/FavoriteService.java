package com.codestates.favorite.service;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
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

//    @Transactional
    public Favorite createFavorite(Favorite favorite) {
//        favoriteRepository.mLikes(productId, memberId);
        return favoriteRepository.save(favorite);

    }

    @Transactional
    public void deleteFavorite(long productId, long memberId) {
//        Favorite findFavorite = findVerifiedFavorite(favoriteId);
        
//        favoriteRepository.delete(findFavorite);
        favoriteRepository.mUnLikes(productId, memberId);
    }

    @Transactional(readOnly = true)
    public Favorite findVerifiedFavorite(long favoriteId) {
        Optional<Favorite> optionalFavorite = favoriteRepository.findById(favoriteId);
        Favorite findFavorite = optionalFavorite.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.FAVORITE_NOT_FOUND));
        return findFavorite;
    }
}
