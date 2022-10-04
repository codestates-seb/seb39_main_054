import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ChatPreviewContent from "./ChatPreviewContent";

const ChatList = () => {
  const { id } = useParams();
  const [chatList, setChatList] = useState("");

  const getChatList = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/chat/rooms/1`)
      .then((res) => setChatList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <CLContainer>
      <h1>채팅</h1>
      <CLContent>
        <ChatPreviewContent chatList={chatList} />
      </CLContent>
    </CLContainer>
  );
};

export default ChatList;

const CLContainer = styled.div`
  background-color: ${(props) => props.theme.gray6};
  color: ${(props) => props.theme.textColor};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    margin: 3.8rem auto;
    font-size: 2.5rem;
    font-family: "NotoSansKR-Medium";
  }
`;

const CLContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36.5rem;
  height: 35.25rem;
  margin: 0 auto 8.875rem auto;
  background-color: bisque;
`;
