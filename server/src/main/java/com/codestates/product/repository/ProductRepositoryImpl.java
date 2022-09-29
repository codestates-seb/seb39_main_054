package com.codestates.product.repository;

import com.codestates.product.entity.Product;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;

import static com.codestates.product.entity.QProduct.product;

@RequiredArgsConstructor
public class ProductRepositoryImpl implements ProductRepositoryCustom {
    // querydsl 쓰려면 필요
    private final JPAQueryFactory queryFactory;


    @Override
    public List<Product> findByCategoryStatusKeyword(String pcategoryName, Product.ProductStatus status, String keyword) {
        return queryFactory
                .selectFrom(product)
                .where(pcategorySearch(pcategoryName),
                        statusSearch(status),
                        keywordSearch(keyword))
                .fetch();
    }

//    @Override
//    public Optional<Page<List<Product>>> findByCategoryStatusKeyword(String pcategoryName, String status, String keyword) {
//        List<Product> productList = queryFactory
//                .selectFrom(product)
//                .where(pcategorySearch(pcategoryName),
//                        statusSearch(status),
//                        keywordSearch(keyword))
//                .fetch();
//        return Optional.ofNullable(productList);
//    }
//
    private BooleanExpression pcategorySearch(String pcategory) {
        if (pcategory == null) {
            return null;
        }
        return product.pcategory.pcategoryName.eq(pcategory);
    }

    private BooleanExpression statusSearch(Product.ProductStatus status) {
        if (status == null) {
            return null;
        }
        return product.productStatus.eq(status);
    }

    private BooleanExpression keywordSearch(String keyword) {
        if (keyword == null) {
            return null;
        }
        return product.title.eq(keyword);
    }
}
