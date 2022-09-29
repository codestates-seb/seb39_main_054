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
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final MemberService memberService;

    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        ChatRoom existsRoom = findExistsRoom(chatRoom);
        return Objects.requireNonNullElseGet(existsRoom, () -> chatRoomRepository.save(chatRoom));
    }

    public List<ChatRoom> findMyChatRooms(long memberId) {
        Member member = memberService.findMember(memberId);
        return chatRoomRepository.findAllByBuyerOrSeller(member, member);
    }
    public ChatRoom findChatRoom(long chatRoomId) {
        return findVerifiedChatRoom(chatRoomId);
    }

    private ChatRoom findVerifiedChatRoom(long chatRoomId) {
        Optional<ChatRoom> optionalChatRoom = chatRoomRepository.findById(chatRoomId);
        ChatRoom findChatRoom = optionalChatRoom.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.CHATROOM_NOT_FOUND));
        return findChatRoom;
    }

    private ChatRoom findExistsRoom(ChatRoom chatRoom) {
        return chatRoomRepository.findByBuyerAndSellerAndProduct(chatRoom.getBuyer(), chatRoom.getSeller(), chatRoom.getProduct());
    }

}
