package com.codestates.chat.controller;

import com.codestates.chat.dto.ChatRoomPostDto;
import com.codestates.chat.entity.ChatRoom;
import com.codestates.chat.mapper.ChatRoomMapper;
import com.codestates.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping(value = "/v1/chat")
@Log4j2
public class ChatRoomController {

    private final ChatRoomService chatRoomService;
    private final ChatRoomMapper chatRoomMapper;

    //채팅방 목록 조회
    @GetMapping(value = "/rooms/{member-id}")
    public ResponseEntity getRooms(@PathVariable("member-id") @Positive long memberId){

        log.info("# All My Chat Rooms");
        List<ChatRoom> myChatRooms = chatRoomService.findMyChatRooms(memberId);
        return new ResponseEntity<>(chatRoomMapper.chatRoomsToChatRoomResponseDtos(myChatRooms), HttpStatus.OK);
    }

    //채팅방 개설
    @PostMapping(value = "/room")
    public ResponseEntity postRoom(@Valid @RequestBody ChatRoomPostDto chatRoomPostDto){

        log.info("# Create Chat Room , chatRoomPostDto: " + chatRoomPostDto);
        ChatRoom chatRoom = chatRoomService.createChatRoom(chatRoomMapper.chatRoomPostDtoToChatRoom(chatRoomPostDto));
        return new ResponseEntity<>(chatRoomMapper.chatRoomToChatRoomResponseDto(chatRoom), HttpStatus.CREATED);
    }

    //채팅방 조회
    @GetMapping("/room/{chatroom-id}")
    public ResponseEntity getRoom(@PathVariable("chatroom-id") @Positive long chatRoomId){

        log.info("# get Chat Room, chatRoomID : " + chatRoomId);
        ChatRoom chatRoom = chatRoomService.findChatRoom(chatRoomId);

        return new ResponseEntity<>(chatRoomMapper.chatRoomToChatRoomResponseDto(chatRoom), HttpStatus.OK);

    }
}
