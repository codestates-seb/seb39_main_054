package com.codestates.scategory.entity;

import com.codestates.audit.Auditable;
import com.codestates.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Scategory extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scategoryId;

    @Column(nullable = false)
    private String scategoryName;

    @OneToMany(mappedBy = "scategory")
    private List<Store> storeList = new ArrayList<>();

    public void addStore(Store store) {
        this.storeList.add(store);
        if (store.getScategory() != this) {
            store.setScategory(this);
        }
    }
}
