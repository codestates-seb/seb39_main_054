package com.codestates.product.entity;

import com.codestates.audit.Auditable;
import com.codestates.favorite.entity.Favorite;
import com.codestates.member.entity.Member;
import com.codestates.pcategory.entity.Pcategory;
import com.codestates.pimage.entity.Pimage;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
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
    private String title;

    @Column
    private String description;

    @Enumerated(value = EnumType.STRING)
    private ProductStatus productStatus;

    @Transient // DB Column 생성 X
    @ColumnDefault("false")
    private boolean favoriteStatus;

    @ColumnDefault("0")
    private Long favoriteCount;

    @ManyToOne
    @JoinColumn(name = "PCATEGORY_ID")
    private Pcategory pcategory;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany (mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<Pimage> pimageList = new ArrayList<>();


    @OneToMany (mappedBy = "product", cascade = CascadeType.REMOVE)
    private List<Favorite> favoriteList = new ArrayList<>();


    public enum ProductStatus{
        PRODUCT_AVAILABLE("대여가능"),
        PRODUCT_USE("대여중"),
        PRODUCT_COMPLETED("반납완료");

        @Getter
        private String status;

        ProductStatus(String status){
            this.status = status;
        }
    }
//
//    public void addPcategory(Pcategory pcategory) {
//        this.pcategory = pcategory;
//        if (!this.pcategory.getProductList().contains(this)) {
//            this.pcategory.getProductList().add(this);
//        }
//    }
//
//    public void addPimage(Pimage pimage) {
//        this.pimageList.add(pimage);
//        if (!this.pimageList.get) {
//            pimage.addProduct(this);
//        }
//    }
//
//    public void addMember(Member member) {
//        this.member = member;
//        if (!this.member.getProductList().contains(this)) {
//            this.member.getProductList().add(this);
//        }
//    }
//
//    public void addPstatus(Pstatus pstatus) {
//        this.pstatus = pstatus;
//        if (!this.pstatus.getProductList().contains(this)) {
//            this.pstatus.getProductList().add(this);
//        }
//    }
//
//    public void addFavorite(Favorite favorite) {
//        this.favoriteList.add(favorite);
//        if (favorite.getProduct() != this) {
//            favorite.addProduct(this);
//        }
//    }
}
