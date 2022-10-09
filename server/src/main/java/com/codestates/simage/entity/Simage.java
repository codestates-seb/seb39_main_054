package com.codestates.simage.entity;

import com.codestates.audit.Auditable;
import com.codestates.store.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Simage extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long simageId;

    @Column (columnDefinition = "Text")
    private String imageUrl;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "STORE_ID")
    private Store store;

    public void setStore(Store store) {
        this.store = store;
        if (!store.getSimageList().contains(this)) {
            store.addSimage(this);
        }
    }
}
