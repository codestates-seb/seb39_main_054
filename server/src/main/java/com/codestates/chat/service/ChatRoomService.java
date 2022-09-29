package com.codestates.chat.service;

import com.codestates.chat.entity.ChatRoom;
import com.codestates.chat.repository.ChatRoomRepository;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final MemberService memberService;

    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        Optional<ChatRoom> optionalChatRoom = findExistsRoom(chatRoom);
        if (optionalChatRoom.isEmpty()) {
            chatRoom.setRoomId(UUID.randomUUID().toString());
        }
        return chatRoomRepository.save(chatRoom);
    }

    public List<ChatRoom> findMyChatRooms(long memberId) {
        Member member = memberService.findMember(memberId);
        return chatRoomRepository.findAllByBuyerOrSeller(member, member);
    }
    public ChatRoom findChatRoom(String roomId) {
        return findVerifiedChatRoom(roomId);
    }

    private ChatRoom findVerifiedChatRoom(String roomId) {
        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findByRoomId(roomId);
        ChatRoom findChatRoom = optionalChatRoom.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND));
        return findChatRoom;
    }

    private Optional<ChatRoom> findExistsRoom(ChatRoom chatRoom) {
        return chatRoomRepository.findByBuyerAndSellerAndProduct(chatRoom.getBuyer(), chatRoom.getSeller(), chatRoom.getProduct());
    }

}
