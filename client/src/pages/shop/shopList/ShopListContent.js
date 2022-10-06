import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ShopCardContent from "../../../components/cards/ShopCardContent";
import DataLoading from "../../../components/loading/DataLoading";

const ShopListContent = () => {
  // 데이터
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 데이터 받기
  const getData = async () => {
    await axios
      // .get(`${process.env.REACT_APP_API_URL}/shop`)
      // .then((res) => setData(res.data));
      .get(`/mock/ShopMockData.json`)
      .then((res) => {
        setData(res.data.shop);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setLoading(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Content>
      {loading ? (
        <DataLoading></DataLoading>
      ) : (
        <ShopCardContent data={data}></ShopCardContent>
      )}
    </Content>
  );
};

export default ShopListContent;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem auto;
  width: 68rem;

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
