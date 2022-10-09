package com.codestates.store.mapper;

import com.codestates.member.dto.MemberResponseDto;
import com.codestates.member.entity.Member;
import com.codestates.member.mapper.MemberMapper;
import com.codestates.scategory.dto.ScategoryResonseDto;
import com.codestates.scategory.entity.Scategory;
import com.codestates.scategory.service.ScategoryService;
import com.codestates.simage.dto.SimageResponseDto;
import com.codestates.simage.entity.Simage;
import com.codestates.store.dto.StorePatchDetailDto;
import com.codestates.store.dto.StorePostDetailDto;
import com.codestates.store.dto.StoreResponseDto;
import com.codestates.store.entity.Store;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = {MemberMapper.class})
public interface StoreMapper {

    default Store postDetailDtoToStore(StorePostDetailDto storePostDetailDto, ScategoryService scategoryService) {
        Store store = new Store();
        store.setTitle(storePostDetailDto.getTitle());
        store.setDescription(storePostDetailDto.getDescription());
        store.setAddress(storePostDetailDto.getAddress());
        store.setPhoneNumber(storePostDetailDto.getPhoneNumber());
        store.setScategory(scategoryService.createScategory(storePostDetailDto.getScategoryName()));
        return store;
    }

    default Store patchDetailDtoToStore(StorePatchDetailDto storePatchDetailDto, ScategoryService scategoryService) {
        Store store = new Store();
        store.setStoreId(storePatchDetailDto.getStoreId());
        store.setTitle(storePatchDetailDto.getTitle());
        store.setDescription(storePatchDetailDto.getDescription());
        store.setAddress(storePatchDetailDto.getAddress());
        store.setAddress(storePatchDetailDto.getPhoneNumber());
        Optional.ofNullable(storePatchDetailDto.getScategoryName()).
        ifPresent(scategoryName -> store.setScategory(scategoryService.createScategory(scategoryName)));
        return store;
    }

    StoreResponseDto.POST storePostToStoreResponseDto(Store store, List<String> imageUrlList);

    StoreResponseDto.PATCH storePatchToStoreResponseDto(Store store, List<String> modifiedImageUrlList);

    @IterableMapping(qualifiedByName = "defaultD2E")
    default StoreResponseDto.DetailResponse storeToStoreDetailResponseDto(Store store) {

        StoreResponseDto.DetailResponse response = StoreResponseDto.DetailResponse.builder()
                .storeId(store.getStoreId())
                .title(store.getTitle())
                .description(store.getDescription())
                .address(store.getAddress())
                .phoneNumber(store.getPhoneNumber())
                .creationDate(store.getCreationDate())
                .lastEditDate(store.getLastEditDate())
                .scategory(scategoryToScategoryResponse(store.getScategory()))
                .member(memberToMemberResponseDto(store.getMember()))
                .simageList(simageListToSimageResponseDtoList(store.getSimageList()))
                .build();
        return response;
    }

    ScategoryResonseDto scategoryToScategoryResponse(Scategory scategory);
    @Named("defaultE2D")
    MemberResponseDto memberToMemberResponseDto(Member member);


    default List<SimageResponseDto> simageListToSimageResponseDtoList(List<Simage> simageList) {

        List<SimageResponseDto> simageResponseDtoList = new ArrayList<>();

        simageResponseDtoList =  simageList.stream()
                .map(image -> SimageResponseDto.builder()
                        .simageId(image.getSimageId())
                        .imageUrl(image.getImageUrl())
                        .build())
                .collect(Collectors.toList());

        return simageResponseDtoList;
    }

    List<StoreResponseDto.DetailResponse> storeToStoreResponseDtoList(List<Store> storeList);

    ScategoryResonseDto scategoryToScategoryResponseDto(Scategory scategory);

    List<StoreResponseDto.DetailResponse> storeListToStoreResponseDtoDetailResponseList (List<Store> storeList);

}
