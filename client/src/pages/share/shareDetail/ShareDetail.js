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
  const [productData, setProductData] = useState("");
  const { id } = useParams();

  const memberId = localStorage.getItem("memberid");

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/product/${id}`)
      .then((res) => setData(res.data));
  };

  // 제품 상세 조회
  const getProduct = async () => {
    await axios
      // .get(`${process.env.REACT_APP_API_URL}/product/${id}`)
      .get(`${process.env.REACT_APP_API_URL}/v1/product/3`)
      .then((res) => {
        setProductData(res.data);
        console.log(res);
      });
  };

  // 채팅방 개설, 채팅상세페이지로 이동
  const openChatting = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/v1/chat/room`, {
        sellerId: productData.member.memberId, // 3
        buyerId: memberId,
        productId: productData.productId,
      })
      .then((res) => {
        navigate(`/chat/detail/${res.data.id}`);
        console.log(res.data.id); // 2 / 룸아이디인듯
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    getProduct();
  }, []);

  return (
    <>
      {!!data && (
        <ShareContainer>
          <Container>
            <Title>{data.title}</Title>
            <DetailEditDropdown data={data} />
            <ShareDetailImg image={data.pimageList}></ShareDetailImg>
            <ShareDetailTitle data={data}></ShareDetailTitle>
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
`;

const Title = styled.div`
  font-size: 3rem;
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
  margin: 0rem 0rem 1rem 0rem;
`;
