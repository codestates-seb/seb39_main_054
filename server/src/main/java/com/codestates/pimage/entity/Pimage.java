package com.codestates.pimage.entity;

import com.codestates.audit.Auditable;
import com.codestates.product.entity.Product;
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
public class Pimage extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pimageId;

    @Column(nullable = false)
    private String image01;

    @Column(nullable = true)
    private String image02;

    @Column(nullable = true)
    private String image03;

    @Column(nullable = true)
    private String image04;

    @Column(nullable = true)
    private String image05;

    @Column(nullable = true)
    private String image06;

    @OneToOne
    @JoinColumn(name = "PRODUCT_ID")
    private Product product;

    public void addProduct(Product product) {
        this.product = product;
        if (product.getPimage()!= this) {
            product.addPimage(this);
        }
    }
}
