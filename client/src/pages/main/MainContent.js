import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ShareCardContent from "../../components/cards/ShareCardContent";

const MainContent = () => {
  // 데이터
  const [data, setData] = useState(null);

  // 데이터 받기
  const getData = async () => {
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "authorization"
    )}`;
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/product`, {
        params: { page: 1, size: 8 },
      })
      .then((res) => setData(res.data.data));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Content>
        <div className="title">최근 게시물</div>
        <ShareCardContent data={data}></ShareCardContent>
      </Content>
    </Container>
  );
};

export default MainContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4.5rem auto;
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

  .title {
    font-size: 1.625rem;
    font-family: "NotoSansKR-Medium";
    margin-bottom: 4.5rem;
  }
`;
