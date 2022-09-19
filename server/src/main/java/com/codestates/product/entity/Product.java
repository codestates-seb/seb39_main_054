package com.codestates.product.entity;

import com.codestates.audit.Auditable;
import com.codestates.favorite.entity.Favorite;
import com.codestates.member.entity.Member;
import com.codestates.pcategory.entity.Pcategory;
import com.codestates.pimage.entity.Pimage;
import com.codestates.pstatus.entity.Pstatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "PCATEGORY_ID")
    private Pcategory pcategory;

    @OneToOne (mappedBy = "product")
    private Pimage pimage;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PSTATUS_ID")
    private Pstatus pstatus;

    @OneToMany (mappedBy = "product")
    private List<Favorite> favoriteList = new ArrayList<>();

    public void addPcategory(Pcategory pcategory) {
        this.pcategory = pcategory;
        if (!this.pcategory.getProductList().contains(this)) {
            this.pcategory.getProductList().add(this);
        }
    }

    public void addPimage(Pimage pimage) {
        this.pimage = pimage;
        if (pimage.getProduct() != this) {
            pimage.addProduct(this);
        }
    }

    public void addMember(Member member) {
        this.member = member;
        if (!this.member.getProductList().contains(this)) {
            this.member.getProductList().add(this);
        }
    }

    public void addPstatus(Pstatus pstatus) {
        this.pstatus = pstatus;
        if (!this.pstatus.getProductList().contains(this)) {
            this.pstatus.getProductList().add(this);
        }
    }

    public void addFavorite(Favorite favorite) {
        this.favoriteList.add(favorite);
        if (favorite.getProduct() != this) {
            favorite.addProduct(this);
        }
    }
}
