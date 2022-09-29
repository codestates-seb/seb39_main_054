package com.codestates.favorite.entity;

import com.codestates.audit.Auditable;
import com.codestates.member.entity.Member;
import com.codestates.product.entity.Product;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Favorite extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    public void addMember(Member member) {
        this.member = member;
        if (!this.member.getFavoriteList().contains(this)) {
            this.member.getFavoriteList().add(this);
        }
    }

    public void addProduct (Product product) {
        this.product = product;
        if (!this.product.getFavoriteList().contains(this)) {
            this.product.getFavoriteList().add(this);
        }
    }

}
