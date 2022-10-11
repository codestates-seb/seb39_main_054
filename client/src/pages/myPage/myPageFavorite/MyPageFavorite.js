import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import Paginations from "../../../components/pagination/Paginations";
import axios from "axios";
import MyPageHeader from "../MyPageHeader";
import MyPageNav from "../MyPageNav";
import MyPageDropdownMobile from "../../../components/dropdowns/MyPageDropdownMobile";
// import ShareStateMobile from "../../../components/filters/shareState/ShareStateMobile";
import ShareCardContent from "../../../components/cards/ShareCardContent";
import ListDataEmpty from "../../../components/loading/DataEmpty";

const MyPageFavorite = () => {
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const id = localStorage.getItem("memberid");
  // 데이터
  const [data, setData] = useState(null);

  const categoryChange = (el) => {};

  // 데이터 받기
  const getData = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("authorization")}`,
    };

    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/product/myFavorite/${id}`, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MFContainer>
      {isMobile && (
        <MyPageDropdownMobile
          categoryChange={categoryChange}
        ></MyPageDropdownMobile>
      )}
      {!isMobile && <MyPageNav></MyPageNav>}
      {/* <ShareStateContainer>
        <ShareStateMobile />
      </ShareStateContainer> */}
      <MCContainer>
        <MCContent>
          {data !== null && data.length === 0 && (
            <ListDataEmpty></ListDataEmpty>
          )}
          <ShareCardContent data={data}></ShareCardContent>
        </MCContent>
        <Paginations />
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
