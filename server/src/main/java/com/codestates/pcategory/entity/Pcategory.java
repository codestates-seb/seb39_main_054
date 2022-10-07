package com.codestates.pcategory.entity;


import com.codestates.audit.Auditable;
import com.codestates.member.entity.Member;
import com.codestates.pimage.entity.Pimage;
import com.codestates.product.entity.Product;
import lombok.*;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pcategory extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pcategoryId;

    @Column(nullable = false)
    private String pcategoryName;

    @OneToMany(mappedBy = "pcategory")
    private List<Product> productList = new ArrayList<>();

    public void addProduct(Product product) {
        this.productList.add(product);
        if (product.getPcategory() != this) {
            product.setPcategory(this);
        }
    }

}
