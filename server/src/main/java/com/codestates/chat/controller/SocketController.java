package com.codestates.chat.controller;

import com.codestates.chat.dto.MessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@RestController
public class SocketController {
    private static Set<Long> memberList = new HashSet<>();

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

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
