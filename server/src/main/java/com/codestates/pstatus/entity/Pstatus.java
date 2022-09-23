package com.codestates.pstatus.entity;

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
public class Pstatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pstatusId;

    @Column(nullable = false)
    private String condition;

    @OneToMany(mappedBy = "pstatus")
    private List<Product> productList = new ArrayList<>();

    public void addProduct(Product product) {
        this.productList.add(product);
        if (product.getPstatus() != this) {
            product.addPstatus(this);
        }
    }
}
