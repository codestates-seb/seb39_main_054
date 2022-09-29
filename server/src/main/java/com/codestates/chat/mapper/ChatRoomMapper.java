package com.codestates.chat.mapper;

import com.codestates.chat.dto.ChatRoomPostDto;
import com.codestates.chat.dto.ChatRoomResponseDto;
import com.codestates.chat.entity.ChatRoom;
import com.codestates.member.entity.Member;
import com.codestates.product.entity.Product;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {
    default ChatRoom chatRoomPostDtoToChatRoom(ChatRoomPostDto chatRoomPostDto) {
        ChatRoom chatRoom = new ChatRoom();
        Member seller = new Member();
        Member buyer = new Member();
        Product product = new Product();

        seller.setMemberId(chatRoomPostDto.getSellerId());
        buyer.setMemberId(chatRoomPostDto.getBuyerId());
        product.setProductId(chatRoomPostDto.getProductId());

        chatRoom.setSeller(seller);
        chatRoom.setBuyer(buyer);
        chatRoom.setProduct(product);

        return chatRoom;
    }

    ChatRoomResponseDto chatRoomToChatRoomResponseDto(ChatRoom chatRoom);

    List<ChatRoomResponseDto> chatRoomsToChatRoomResponseDtos(List<ChatRoom> chatRooms);

}
