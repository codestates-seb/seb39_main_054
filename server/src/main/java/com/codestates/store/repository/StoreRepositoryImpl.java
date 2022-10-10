package com.codestates.store.repository;

import com.codestates.PagingUtil;
import com.codestates.store.entity.Store;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import static com.codestates.store.entity.QStore.store;

@RequiredArgsConstructor
public class StoreRepositoryImpl implements StoreRepositoryCustom {
    // querydsl 쓰려면 필요
    private final JPAQueryFactory jpaQueryFactory;
    private final PagingUtil pagingUtil;

    @Override
    public PageImpl<Store> findByCategoryKeyword(String scategoryName, String keyword, Pageable pageable) {

        JPQLQuery<Store> storeList = jpaQueryFactory
                .selectFrom(store)
                .where(scategorySearch(scategoryName),
                        keywordSearch(keyword));

        return pagingUtil.getPageImpl(pageable, storeList, Store.class);
    }

    private BooleanExpression scategorySearch(String scategory) {
        if (scategory == null) {
            return null;
        }
        return store.scategory.scategoryName.eq(scategory);
    }


    private BooleanExpression keywordSearch(String keyword) {
        if (keyword == null) {
            return null;
        }
        return store.title.contains(keyword);
    }
}
