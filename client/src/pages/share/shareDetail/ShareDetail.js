import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ShareDetailTitle from "./ShareDetailTitle";
import ShareDetailContent from "./ShareDetailContent";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ShareDetailImg from "./ShareDetailImg";
import DetailEditDropdown from "../../../components/dropdowns/DetailEditDropdown";

const ShareDetail = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [myAvatar, setMyAvatar] = useState("");
  const { id } = useParams();

  const memberId = localStorage.getItem("memberid");

  const getData = async () => {
    // header에 토큰값 기본으로 넣기
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "authorization"
    )}`;
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/product/${id}`)
      .then((res) => {
        setData(res.data);
        setMyAvatar(res.data.member.imageUrl);
      });
  };

  // 채팅방 개설, 채팅상세페이지로 이동
  const openChatting = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/v1/chat/room`, {
        sellerId: data.member.memberId,
        buyerId: memberId,
        productId: data.productId,
      })
      .then((res) => {
        navigate(`/chat/detail/${res.data.id}`);
        console.log(res.data.id); // 룸아이디임
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!!data && (
        <ShareContainer>
          <Container>
            <Title>{data.title}</Title>
            {data.member.memberId === Number(memberId) && (
              <DetailEditDropdown data={data} />
            )}
            <ShareDetailImg image={data.pimageList}></ShareDetailImg>
            <ShareDetailTitle
              data={data}
              myAvatar={myAvatar}
            ></ShareDetailTitle>
            <div>
              <hr></hr>
            </div>
            <ContentContainer>
              <ShareDetailContent content={data}></ShareDetailContent>
            </ContentContainer>
            <Buttondiv onClick={() => openChatting()}>
              <ChatBtn>채팅하기</ChatBtn>
            </Buttondiv>
          </Container>
        </ShareContainer>
      )}
    </>
  );
};

export default ShareDetail;

const ShareContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7.5rem;
  width: 56.25rem;
  //width: 40rem;
  hr {
    margin: 1rem 0rem;
  }
`;
const ContentContainer = styled.div`
  width: 100%;
  word-break: break-all;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  line-height: 1.8rem;
`;

const Title = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ChatBtn = styled.button`
  width: 8.125rem;
  height: 8.125rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary};
  font-size: 1.375rem;
  color: white;
`;
const Buttondiv = styled.div`
  text-align: right;
  margin-bottom: 2rem;
`;
