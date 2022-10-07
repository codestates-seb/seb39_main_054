package com.codestates.helper;

import com.codestates.favorite.dto.FavoritePostDto;
import com.codestates.favorite.dto.FavoriteResponseDto;
import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.dto.MemberResponseDto;
import com.codestates.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class FavoriteStubData {
    private static Map<HttpMethod, Object> stubRequestBody;
    static {
        stubRequestBody = new HashMap<>();
        stubRequestBody.put(HttpMethod.POST, new FavoritePostDto(1, 1));
    }

    public static class MockFavorite {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }

        public static FavoriteResponseDto getSingleResponseBody() {
            return new FavoriteResponseDto(1,
                    1,
                    1,
                    LocalDateTime.now(),
                    LocalDateTime.now());
        }
    }

}
