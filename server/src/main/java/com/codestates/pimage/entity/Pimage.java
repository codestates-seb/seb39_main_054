package com.codestates.pimage.entity;

import com.codestates.audit.Auditable;
import com.codestates.product.entity.Product;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pimage extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pimageId;

    @Column
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;


    public void setProduct(Product product) {
        if (this.product != null) {
            this.product.getPimageList().remove(this);
        }
        this.product = product;
        product.addPimage(this);
    }
}
