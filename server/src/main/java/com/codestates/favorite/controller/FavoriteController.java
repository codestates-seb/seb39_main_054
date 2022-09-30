package com.codestates.favorite.controller;

import com.codestates.favorite.dto.FavoritePostDto;
import com.codestates.favorite.entity.Favorite;
import com.codestates.favorite.mapper.FavoriteMapper;
import com.codestates.favorite.service.FavoriteService;
import com.codestates.member.jwt.oauth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/v1/favorites")
@Validated
@RequiredArgsConstructor
public class FavoriteController {
    private final FavoriteService favoriteService;
    private final FavoriteMapper favoriteMapper;

    @PostMapping("/{product-id}")
    public ResponseEntity postFavorite(@PathVariable("product-id") @Positive long productId,
                                       @AuthenticationPrincipal PrincipalDetails principalDetails) {
        // 09/21 테스트에서 PrincipalDetails 를 가지고 오지 못하는 이유? => PrincipalDetails 인스턴스를 만들어줘야 함.
//        System.out.println("user.getUsername() = " + user.getUsername());
//        System.out.println("user.getPassword() = " + user.getPassword());
        long memberId = principalDetails.getMember().getMemberId();
        FavoritePostDto favoritePostDto = new FavoritePostDto(memberId, productId);
        Favorite favorite = favoriteService.createFavorite(favoriteMapper.favoritePostDtoToFavorite(favoritePostDto));

        return new ResponseEntity<>(favoriteMapper.favoriteToFavoriteResponseDto(favorite), HttpStatus.CREATED);
//        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("{product-id}")
    public ResponseEntity deleteFavorite(@PathVariable("product-id") @Positive long productId,
                                         @AuthenticationPrincipal PrincipalDetails principalDetails) {
        long memberId = principalDetails.getMember().getMemberId();
        favoriteService.deleteFavorite(productId, memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // TODO 09/21 favorite count는 product get method 에 포함할 것
//    @GetMapping("{product-id}")
//    public ResponseEntity getFavoriteCount(@PathVariable("product-id") @Positive long productId,
//                                      @AuthenticationPrincipal PrincipalDetails principalDetails) {
//        return new ResponseEntity()
//    }

}

