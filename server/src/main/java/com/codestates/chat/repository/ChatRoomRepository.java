package com.codestates.chat.repository;

import com.codestates.chat.entity.ChatRoom;
import com.codestates.member.entity.Member;
import com.codestates.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findAllByBuyerOrSeller(Member buyer, Member seller);

    Optional<ChatRoom> findByRoomId(String roomId);

    ChatRoom findByBuyerAndSellerAndProduct(Member buyer, Member seller, Product product);
}
