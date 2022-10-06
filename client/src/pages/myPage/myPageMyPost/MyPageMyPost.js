import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Paginations from "../../../components/pagination/Paginations";
import axios from "axios";
import MyPageHeader from "../MyPageHeader";
import MyPageNav from "../MyPageNav";
import MyPageDropdownMobile from "../../../components/dropdowns/MyPageDropdownMobile";
import ShareCardContent from "../../../components/cards/ShareCardContent";
import ListDataEmpty from "../../../components/loading/DataEmpty";

const MyPageMyPost = () => {
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const id = localStorage.getItem("memberid");

  // 데이터
  const [data, setData] = useState(null);

  const categoryChange = (el) => {};

  // 데이터 받기
  const getData = async () => {
    const params = {
      page: 1,
      size: 8,
    };

    // header에 토큰값 기본으로 넣기
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "authorization"
    )}`;
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/product/myList/${id}`, {
        params,
      })
      .then((res) => setData(res.data.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MPContainer>
      <MyPageHeader />
      {isMobile && (
        <MyPageDropdownMobile
          categoryChange={categoryChange}
        ></MyPageDropdownMobile>
      )}
      {!isMobile && <MyPageNav></MyPageNav>}
      <MCContainer>
        <MCContent>
          {data !== null && data.length === 0 && (
            <ListDataEmpty></ListDataEmpty>
          )}
          <ShareCardContent data={data}></ShareCardContent>
        </MCContent>
        <Paginations />
      </MCContainer>
    </MPContainer>
  );
};

export default MyPageMyPost;

const MPContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
`;

const MCContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2.7rem 0 1rem 0;
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
