import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import defaultAvatar from "../../../assets/img/avatar/avatar.jpg";
// import { ReactComponent as Xmark } from "../../../assets/img/icon/xmark-solid.svg";
// import { useParams } from "react-router-dom";
// import Stomp from "stompjs";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
// import SockJsClient from "react-stomp";

const ChatDetail = () => {
  const { id } = useParams();
  const ROOM_SEQ = id;
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const memberId = localStorage.getItem("memberid");

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_API_URL}/gs-guide-websocket`), // proxy를 통한 접속
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(
      `/queue/addChatToClient/${ROOM_SEQ}`,
      ({ body }) => {
        setChatMessages((_chatMessages) => [
          ..._chatMessages,
          JSON.parse(body),
        ]);
      }
    );
  };

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: `/app/chat/${ROOM_SEQ}`,
      body: JSON.stringify({
        chatRoomId: ROOM_SEQ,
        memberId: memberId,
        content: message,
      }),
    });

    setMessage("");
  };

  return (
    <div>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((el, index) => (
            <li key={index}>
              {el.memberId}: {el.content}
            </li>
          ))}
        </ul>
      )}
      <div>
        <input
          type={"text"}
          placeholder={"message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        <button onClick={() => publish(message)}>send</button>
      </div>
    </div>
  );
};
export default ChatDetail;
