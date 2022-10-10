package com.codestates.product.entity;

import com.codestates.audit.Auditable;
import com.codestates.favorite.entity.Favorite;
import com.codestates.member.entity.Member;
import com.codestates.pcategory.entity.Pcategory;
import com.codestates.pimage.entity.Pimage;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column
    @NotNull
    private String title;

    @Column
    @NotNull
    private String description;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    @NotNull
    private ProductStatus productStatus = ProductStatus.대여가능;

    @Transient // DB에 컬럼 안만들어짐
    private boolean favoriteStatus;

    @Transient // DB에 컬럼 안만들어짐
    private int favoriteCount;

    @ManyToOne
    @JoinColumn(name = "PCATEGORY_ID")
    private Pcategory pcategory;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

//    @OneToMany (mappedBy = "product", cascade = {CascadeType.REMOVE,CascadeType.MERGE,CascadeType.PERSIST}) // Product 조회가 안됨. -> 지연로딩 에러
    @OneToMany (mappedBy = "product", fetch = FetchType.EAGER, cascade = {CascadeType.REMOVE,CascadeType.MERGE,CascadeType.PERSIST})
    private List<Pimage> pimageList = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<Favorite> favoriteList;


    public enum ProductStatus{
        대여가능,
        대여중,
        반납완료;
    }

    public void addPimage(Pimage pimage) {
        this.pimageList.add(pimage);
        if (pimage.getProduct() != this) {
            pimage.setProduct(this);
        }
    }

    // Todo : 추가
    public void addFavorite(Favorite favorite) {
        this.favoriteList.add(favorite);
        if (favorite.getProduct() != this) {
            favorite.setProduct(this);
        }
    }


    public void setPcategory(Pcategory pcategory) {

        this.pcategory = pcategory;
        if (!pcategory.getProductList().contains(this)) {
            pcategory.addProduct(this);
        }
    }
}