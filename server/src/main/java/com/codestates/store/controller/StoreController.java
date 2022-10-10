package com.codestates.store.controller;

import com.codestates.member.jwt.oauth.PrincipalDetails;
import com.codestates.response.MultiResponseDto;
import com.codestates.scategory.service.ScategoryService;
import com.codestates.simage.entity.Simage;
import com.codestates.store.dto.StorePatchDto;
import com.codestates.store.dto.StorePostDto;
import com.codestates.store.dto.StoreResponseDto;
import com.codestates.store.entity.Store;
import com.codestates.store.mapper.StoreMapper;
import com.codestates.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/store")
@Validated
@Slf4j
@RequiredArgsConstructor
public class StoreController {

    private final StoreMapper mapper;
    private final StoreService storeService;
    private final ScategoryService scategoryService;

    /**
     * 매장 등록 // memberId
     */
    @PostMapping
    public ResponseEntity postStore(@ModelAttribute @Valid StorePostDto request,
                                    @AuthenticationPrincipal PrincipalDetails principalDetails) {
//                                      @AuthenticationPrincipal PrincipalDetails principalDetails

        List<String> imageUrlList = new ArrayList<>();

//        Long memberId = request.getStorePostDetailDto().getMemberId();
        Long memberId = principalDetails.getMember().getMemberId(); // Todo: 9/27 배포 전, Security config 수정해야하고 PrincipalDetails로 수정 필요함

        Store store = mapper.postDetailDtoToStore(request.getStorePostDetailDto(), scategoryService);

        List<Simage> simageList = storeService.uploadImage(request.getMultipartFileList(), imageUrlList);
        Store storePost = storeService.createStore(store, memberId, simageList);

        StoreResponseDto.POST storeResponseDto = mapper.storePostToStoreResponseDto(storePost, imageUrlList);
        return new ResponseEntity(storeResponseDto, HttpStatus.CREATED);
    }

    /**
     * 매장 수정 // memberId
     */
    @PatchMapping("/{store-id}")
    public ResponseEntity patchProduct(@PathVariable("store-id") @Positive long storeId,
                                       @ModelAttribute @Valid StorePatchDto request,
                                       @AuthenticationPrincipal PrincipalDetails principalDetails) {
//                                      @AuthenticationPrincipal PrincipalDetails principalDetails

        request.getStorePatchDetailDto().setStoreId(storeId);
//        Long memberId = request.getStorePatchDetailDto().getMemberId();
        Long memberId = principalDetails.getMember().getMemberId(); // Todo: 9/27 배포 전, Security config 수정해야하고 PrincipalDetails로 수정 필요함

        Store store = mapper.patchDetailDtoToStore(request.getStorePatchDetailDto(), scategoryService);
        Store storePatch = storeService.updateStore(store, memberId);

        List<String> modifiedImageUrlList = storeService.updateImage(storePatch.getStoreId(), request.getImageUrlList());

        StoreResponseDto.PATCH storeResponseDto = mapper.storePatchToStoreResponseDto(storePatch, modifiedImageUrlList);


        return new ResponseEntity<>(storeResponseDto, HttpStatus.OK);
    }

    /**
     * 매장 삭제 // 토큰
     */
    @DeleteMapping("/{store-id}")
    public ResponseEntity deleteProduct(@PathVariable("store-id") @Positive Long storeId,
                                        @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Long memberId = principalDetails.getMember().getMemberId();
        storeService.deleteQuestion(storeId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 매장 상세조회 // 토큰 option
     */
    @GetMapping("/{store-id}")
    public ResponseEntity getStore(@PathVariable("store-id") @Positive long storeId,
                                     @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Long memberId = principalDetails != null ? principalDetails.getMember().getMemberId() : 0L;

        Store store = storeService.findStore(storeId, memberId);

        StoreResponseDto.DetailResponse storeDetailResponseDto = mapper.storeToStoreDetailResponseDto(store);

        return new ResponseEntity<>(storeDetailResponseDto, HttpStatus.OK);
    }

    /**
     * 매장 리스트 조회 (feat: 카테고리, 검색어) -> QueryDsl // 토큰 option
     */
    @GetMapping
    public ResponseEntity getProductList(@Positive @RequestParam(defaultValue = "1") int page,
                                         @Positive @RequestParam(defaultValue = "50") int size,
                                         @RequestParam @Nullable String scategoryName,
                                         @RequestParam @Nullable String keyword,
                                         @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Long memberId = principalDetails != null ? principalDetails.getMember().getMemberId() : 0L;


        PageImpl<Store> pageStoreList = storeService.findStoreList(page - 1, size,scategoryName,keyword, memberId);
        List<Store> storeList = pageStoreList.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.storeToStoreResponseDtoList(storeList), pageStoreList),HttpStatus.OK);
    }
}
