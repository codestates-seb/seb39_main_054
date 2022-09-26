package com.codestates.member.entity;

import com.codestates.audit.Auditable;
import com.codestates.favorite.entity.Favorite;
import com.codestates.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String memberName;  // 사용자 ID

    @Column
    private String password;

    @Column
    private String nickname;

    @Column
    private String roles; // USER, MANAGER, ADMIN

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    private String imageName;

    private String imageUrl;

    public Member(String nickname, String memberName, String password) {
        this.nickname = nickname;
        this.memberName = memberName;
        this.password = password;
    }

    public Member(Long memberId, String memberName, String password, String nickname) {
        this.memberId = memberId;
        this.memberName = memberName;
        this.password = password;
        this.nickname = nickname;
    }

    public List<String> getRoleList() {    //????? 언제 사용하니???
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    /**
     * 재진님에게 알려줘야함.
     */
    @OneToMany (mappedBy = "member")
    private List<Product> productList = new ArrayList<>();


    /**
     * 재진님에게 알려줘야함.
     */
    @OneToMany (mappedBy = "member")
    private List<Favorite> favoriteList = new ArrayList<>();


    public void addProduct(Product product) {
        this.productList.add(product);
        if (product.getMember() != this) {
            product.addMember(this);
        }
    }

    public void addFavorite(Favorite favorite) {
        this.favoriteList.add(favorite);
        if (favorite.getMember() != this) {
            favorite.addMember(this);
        }
    }

}
