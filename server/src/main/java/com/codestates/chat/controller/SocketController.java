package com.codestates.chat.controller;

import com.codestates.chat.dto.MessagePostDto;
import com.codestates.chat.entity.ChatRoom;
import com.codestates.chat.mapper.MessageMapper;
import com.codestates.chat.service.ChatRoomService;
import com.codestates.chat.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SocketController {
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatRoomService chatRoomService;
    private final MessageService messageService;
    private final MessageMapper messageMapper;

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/app/chat/enter"

    @MessageMapping(value = "/chat/enter")
    public void enter(MessagePostDto messagePostDto){
        messagePostDto.setContent(messagePostDto.getMemberId() + "님이 채팅방에 참여하였습니다.");
        this.simpMessagingTemplate.convertAndSend("/queue/addChatToClient/" + messagePostDto.getChatRoomId(), messagePostDto);
    }

    @MessageMapping("/chat/{id}")
    public void sendMessage(@Payload MessagePostDto messagePostDto, @DestinationVariable Integer id) {
        this.simpMessagingTemplate.convertAndSend("/queue/addChatToClient/" + id, messagePostDto);

        // DB에 채팅내용 저장
        ChatRoom chatRoom = chatRoomService.findChatRoom(messagePostDto.getChatRoomId());
        messageService.createMessage(messageMapper.messagePostDtoToMessage(messagePostDto));
    }
}
