package com.codestates.product.entity;

import com.amazonaws.services.ec2.model.EventType;
import com.codestates.audit.Auditable;
import com.codestates.favorite.entity.Favorite;
import com.codestates.member.entity.Member;
import com.codestates.pcategory.entity.Pcategory;
import com.codestates.pimage.entity.Pimage;
import com.fasterxml.jackson.annotation.JsonCreator;
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
    @Column(length = 20, nullable = false)
    private ProductStatus productStatus = ProductStatus.대여가능;

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

    @OneToMany (mappedBy = "product", cascade = {CascadeType.REMOVE,CascadeType.MERGE,CascadeType.PERSIST})
    private List<Pimage> pimageList = new ArrayList<>();


    @OneToMany (mappedBy = "product", cascade = CascadeType.ALL)
    private List<Favorite> favoriteList = new ArrayList<>();


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

    public void setPcategory(Pcategory pcategory) {

        this.pcategory = pcategory;
        if (!pcategory.getProductList().contains(this)) {
            pcategory.addProduct(this);
        }
    }



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
