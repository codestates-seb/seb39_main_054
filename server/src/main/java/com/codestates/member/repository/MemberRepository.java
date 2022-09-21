package com.codestates.member.repository;

import com.codestates.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberName(String memberName);
}
