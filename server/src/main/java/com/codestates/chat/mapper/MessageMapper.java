package com.codestates.chat.mapper;

import com.codestates.chat.dto.MessagePostDto;
import com.codestates.chat.entity.ChatRoom;
import com.codestates.chat.entity.Message;
import com.codestates.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    default Message messagePostDtoToMessage(MessagePostDto messagePostDto) {
        Message message = new Message();
        Member member = new Member();
        ChatRoom chatRoom = new ChatRoom();

        member.setMemberId(messagePostDto.getMemberId());
        chatRoom.setId(messagePostDto.getChatRoomId());

        message.setContent(messagePostDto.getContent());
        message.setChatRoom(chatRoom);
        message.setMember(member);

        return message;
    }
}
