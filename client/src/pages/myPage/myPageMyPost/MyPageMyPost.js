import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import axios from "axios";
import MyPageHeader from "../MyPageHeader";
import MyPageNav from "../MyPageNav";
import MyPageDropdownMobile from "../../../components/dropdowns/MyPageDropdownMobile";
import ShareStateMobile from "../../../components/filters/shareState/ShareStateMobile";
import ShareCardContent from "../../../components/cards/ShareCardContent";

const MyPageMyPost = () => {
  // 데이터
  const [data, setData] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 786 });

  const categoryChange = (el) => {};

  // 데이터 받기
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product`)
      .then((res) => setData(res.data));
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
      <ShareStateContainer>
        <ShareStateMobile />
      </ShareStateContainer>
      <MCContainer>
        <MCContent>
          <ShareCardContent data={data} number={8}></ShareCardContent>
        </MCContent>
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
