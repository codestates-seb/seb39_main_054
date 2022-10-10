package com.codestates.store.entity;

import com.codestates.audit.Auditable;
import com.codestates.member.entity.Member;
import com.codestates.scategory.entity.Scategory;
import com.codestates.simage.entity.Simage;
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
public class Store extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;

    @Column
    @NotNull
    private String title;

    @Column
    @NotNull
    private String description;

    @Column
    private String address;

    @Column
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "SCATEGORY_ID")
    private Scategory scategory;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    //    @OneToMany (mappedBy = "product", cascade = {CascadeType.REMOVE,CascadeType.MERGE,CascadeType.PERSIST}) // Product 조회가 안됨. -> 지연로딩 에러
    @OneToMany(mappedBy = "store", fetch = FetchType.EAGER, cascade = {CascadeType.REMOVE, CascadeType.MERGE, CascadeType.PERSIST})
    private List<Simage> simageList = new ArrayList<>();

    public void addSimage(Simage simage) {
        this.simageList.add(simage);
        if (simage.getStore() != this) {
            simage.setStore(this);
        }
    }

    public void setScategory(Scategory scategory) {

        this.scategory = scategory;
        if (!scategory.getStoreList().contains(this)) {
            scategory.addStore(this);
        }
    }
}