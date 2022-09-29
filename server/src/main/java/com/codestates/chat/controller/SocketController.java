package com.codestates.chat.controller;

import com.codestates.chat.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class SocketController {
    private static Set<Long> memberList = new HashSet<>();

    private final SimpMessagingTemplate simpMessagingTemplate;

    //Client가 SEND할 수 있는 경로
    //stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
    //"/app/chat/enter"

    @MessageMapping(value = "/chat/enter")
    public void enter(MessageDto messageDto){
        messageDto.setMessage(messageDto.getWriter() + "님이 채팅방에 참여하였습니다.");
        this.simpMessagingTemplate.convertAndSend("/queue/addChatToClient/" + messageDto.getRoomId(), messageDto);
    }

    @MessageMapping("/chat/{id}")
    public void sendMessage(@Payload MessageDto messageDto, @DestinationVariable Integer id) {
        this.simpMessagingTemplate.convertAndSend("/queue/addChatToClient/" + id, messageDto);
    }

    @MessageMapping("/join")
    public void joinMember(@Payload Long memberId) {
        memberList.add(memberId);
        memberList.forEach(System.out::println);
    }
}
