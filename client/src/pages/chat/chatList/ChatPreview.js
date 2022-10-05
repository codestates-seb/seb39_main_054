import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChatPreview = ({ productId, sellerId, lastEditDate }) => {
  const { chatRoomId } = useParams();
  const [data, setData] = useState(null);

  // 이 두가지로 채팅을 보낸 사람 (바이어)의 정보를 알 수 있음.
  // data.ninkname;
  // data.imageUrl;

  // 특정 회원 정보 조회 데이터 받기
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/members/${sellerId}`)
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Link to={`/chat/detail/2`}>
        {/* <Link to={`/chat/detail/${chatRoomId}`}> */}
        <Content>
          <div className="img-container"></div>
          <div className="text-container">
            <div className="sellerId">{sellerId} </div>
            <div className="text"></div>
            <div className="time"></div>
          </div>
        </Content>
      </Link>
    </Container>
  );
};

export default ChatPreview;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: azure;
`;

const Content = styled.div``;
