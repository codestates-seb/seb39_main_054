package com.codestates.favorite.entity;

import com.codestates.audit.Auditable;
import com.codestates.member.entity.Member;
import com.codestates.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Favorite extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long favoriteId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
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
