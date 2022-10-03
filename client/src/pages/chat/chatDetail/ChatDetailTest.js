import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import InputContainer from "./InputContainer";

// 여기는 client.send 가 없는데???? 대체 어떤방식으로 보내는거지.?

const ChatDetailTest = () => {
  const Stomp = require("stompjs"); // --> ??
  const sock = new SockJS("http://localhost:8080/chat/detail");
  const client = Stomp.over(sock);

  const [content, setContent] = useState("");

  useEffect(() => {
    connect();
    return () => disConnect();
  }, []);

  const addContent = (message) => {
    setContent(content.concat(message));
  };

  const connect = () => {
    client.subscribe("/from/liar/start/1", (data) => {
      const newMessage = JSON.parse(data.body).message;
      addContent(newMessage);
    });

    client.activate();
  };

  const handler = (message) => {
    if (!client.connected) return;

    client.publish({
      destination: "/to/liar/start/1",
      body: JSON.stringify({
        message: message,
      }),
    });
  };

  const disConnect = () => {
    if (client.connected) client.deactivate();
  };

  return (
    <>
      <div>
        <div id="menu">
          <p>Welcome,</p>
        </div>
        <div>{content}</div>
        <InputContainer sendMessage={handler} />
      </div>
    </>
  );
};

export default ChatDetailTest;
