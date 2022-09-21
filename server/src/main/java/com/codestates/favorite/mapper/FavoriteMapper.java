package com.codestates.favorite.mapper;

import com.codestates.favorite.dto.FavoritePostDto;
import com.codestates.favorite.dto.FavoriteResponseDto;
import com.codestates.favorite.entity.Favorite;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FavoriteMapper {
    Favorite favoritePostDtoToFavorite(FavoritePostDto favoritePostDto);

    FavoriteResponseDto favoriteToFavoriteResponseDto(Favorite favorite);
}
