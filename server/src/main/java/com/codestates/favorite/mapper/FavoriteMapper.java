package com.codestates.favorite.mapper;

import com.codestates.favorite.dto.FavoritePostDto;
import com.codestates.favorite.dto.FavoriteResponseDto;
import com.codestates.favorite.entity.Favorite;
import com.codestates.member.entity.Member;
import com.codestates.product.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface FavoriteMapper {
    default Favorite favoritePostDtoToFavorite(FavoritePostDto favoritePostDto) {
        Favorite favorite = new Favorite();
        Member member = new Member();
        Product product = new Product();

        member.setMemberId(favoritePostDto.getMemberId());
        product.setProductId(favoritePostDto.getProductId());

        favorite.setProduct(product);
        favorite.setMember(member);

        return favorite;
    }

    default FavoriteResponseDto favoriteToFavoriteResponseDto(Favorite favorite) {
        if (favorite == null) {
            return null;
        }

        FavoriteResponseDto favoriteResponseDto = new FavoriteResponseDto();

        favoriteResponseDto.setFavoriteId(favorite.getFavoriteId());
        favoriteResponseDto.setMemberId(favorite.getMember().getMemberId());
        favoriteResponseDto.setProductId(favorite.getProduct().getProductId());
        favoriteResponseDto.setCreationDate(favorite.getCreationDate());
        favoriteResponseDto.setLastEditDate(favorite.getLastEditDate());

        return favoriteResponseDto;
    }
}
