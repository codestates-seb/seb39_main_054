package com.codestates.member.entity;

import com.codestates.audit.Auditable;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.favorite.entity.Favorite;
import com.codestates.product.entity.Product;
import lombok.*;

import javax.persistence.*;
import java.util.*;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Entity
@Builder
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String memberName;  // 사용자 ID

    // TODO 09/27 PK 를 memeberName 이 아닌 email 로 변경 필요할 수도 (oauth2 로그인 때문에)
    @Column
    private String email;
    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    @Column
    private String roles; // USER, MANAGER, ADMIN

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    private String imageName;

    @Column(length = 512)
    private String imageUrl;

    private String provider;

    private String providerId;

    private String refreshToken;

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

    public static Member of(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case GOOGLE:
                return Member.builder()
                        .email((String) attributes.get("email"))
                        .nickname((String) attributes.get("given_name"))
                        .memberName((String) attributes.get("name"))
                        .provider(providerType.name())
                        .providerId((String) attributes.get("sub"))
                        .imageUrl((String) attributes.get("picture"))
                        .roles("ROLE_USER")
                        .memberStatus(MemberStatus.MEMBER_ACTIVE)
                        .password("12345678")
                        .build();
            case KAKAO:
                Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
                Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");
                return Member.builder()
                        .email(Optional.ofNullable(account.get("email")).orElse("KAKAO" + attributes.get("id").toString()).toString())
                        .nickname((String) properties.get("nickname"))
                        .imageUrl((String) properties.get("profile_image"))
                        .provider("KAKAO")
                        .providerId(String.valueOf(attributes.get("id")))
                        .password("12345678")
                        .roles("ROLE_USER")
                        .memberStatus(MemberStatus.MEMBER_ACTIVE)
                        .build();

            default:
                throw new BusinessLogicException(ExceptionCode.PROVIDER_NOT_FOUND);
        }
    }

//    @Builder
//    public Member(String memberName, String email, String roles, String provider, String providerId) {
//        this.memberName = memberName;
//        this.email = email;
//        this.roles = roles;
//        this.provider = provider;
//        this.providerId = providerId;
//    }

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

    public enum ProviderType {
        GOOGLE("GOOGLE"),
        KAKAO("KAKAO");

        private final String name;

        ProviderType(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
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

//    @ManyToMany(mappedBy = "members", cascade = CascadeType.ALL)
//    private Set<Conversation> conversations = new HashSet<>();

//    public void addProduct(Product product) {
//        this.productList.add(product);
//        if (product.getMember() != this) {
//            product.addMember(this);
//        }
//    }
//
//    public void addFavorite(Favorite favorite) {
//        this.favoriteList.add(favorite);
//        if (favorite.getMember() != this) {
//            favorite.addMember(this);
//        }
//    }

}
