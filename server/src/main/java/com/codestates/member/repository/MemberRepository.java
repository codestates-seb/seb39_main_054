package com.codestates.member.repository;

import com.codestates.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberName(String memberName);

    Member findByNickname(String nickname);

    Optional<Member> findByProviderAndProviderId(String provider, String providerId);

    int countAllByNicknameStartsWith(String nickname);

    @Modifying
    @Query(value = "UPDATE member SET refresh_token = ?2 WHERE member_id = ?1 ", nativeQuery = true)
    void updateRefreshToken(Long id, String refreshToken);
}
