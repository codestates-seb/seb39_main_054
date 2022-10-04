import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import axios from "axios";
import MyPageHeader from "../MyPageHeader";
import MyPageNav from "../MyPageNav";
import MyPageDropdownMobile from "../../../components/dropdowns/MyPageDropdownMobile";
import ShareStateMobile from "../../../components/filters/shareState/ShareStateMobile";
import ShareCardContent from "../../../components/cards/ShareCardContent";
import { useParams, useNavigate } from "react-router-dom";

const MyPageFavorite = () => {
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberid");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("authorization")}`,
  };

  // 데이터
  // const [data, setData] = useState(null);
  const [productData, setProductData] = useState("");
  const [detail, setDetail] = useState("");

  const categoryChange = (el) => {};

  // 관심 목록 조회
  // const getData = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}/v1/product/mylist/${memberId}`)
  //     .then((res) => setData(res.data));
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

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

  // // 특정 회원 정보 조회 / 헤더에 토큰 담아줘야함.
  // const getMember = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}/v1/members/${memberId}`, {
  //       headers: headers,
  //     })
  //     .then((res) => {
  //       setDetail(res.data);
  //       console.log(res);
  //     });
  // };

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

  // console.log(memberId);

  useEffect(() => {
    // getData();
    getProduct();
    // getMember();
  }, []);

  return (
    <MFContainer>
      <MyPageHeader />
      {isMobile && (
        <MyPageDropdownMobile
          categoryChange={categoryChange}
        ></MyPageDropdownMobile>
      )}
      {!isMobile && <MyPageNav></MyPageNav>}
      <ShareStateContainer>
        <ShareStateMobile />
      </ShareStateContainer>
      <button onClick={() => openChatting()}>채팅하기</button>
      <MCContainer>
        <MCContent>
          {/* <ShareCardContent data={data} number={8}></ShareCardContent> */}
        </MCContent>
      </MCContainer>
    </MFContainer>
  );
};

export default MyPageFavorite;

const MFContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
`;

const ShareStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MCContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MCContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem auto;
  width: 72.25rem;

  @media ${(props) => props.theme.tabletL} {
    width: 53.5rem;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 36rem;
  }

  @media ${(props) => props.theme.mobile} {
    width: 26.75rem;
  }
`;
