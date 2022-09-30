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

    default ChatRoomResponseDto chatRoomToChatRoomResponseDto(ChatRoom chatRoom) {
        if (chatRoom == null) {
            return null;
        }

        ChatRoomResponseDto chatRoomResponseDto = new ChatRoomResponseDto();

        chatRoomResponseDto.setId(chatRoom.getId());
        chatRoomResponseDto.setRoomId(chatRoom.getRoomId());
        chatRoomResponseDto.setName(chatRoom.getName());
        chatRoomResponseDto.setProductId(chatRoom.getProduct().getProductId());
        chatRoomResponseDto.setSellerId(chatRoom.getSeller().getMemberId());
        chatRoomResponseDto.setBuyerId(chatRoom.getBuyer().getMemberId());
        chatRoomResponseDto.setCreationDate(chatRoom.getCreationDate());
        chatRoomResponseDto.setLastEditDate(chatRoom.getLastEditDate());

        return chatRoomResponseDto;
    }

    List<ChatRoomResponseDto> chatRoomsToChatRoomResponseDtos(List<ChatRoom> chatRooms);

}
