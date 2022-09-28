import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import ShareCardContent from "../../components/cards/ShareCardContent";

const MyPageContent = () => {
  // 반응형으로 틀의 크기잡기
  const [width, setWidth] = useState("71.25rem");
  // 반응형 별 카드 갯수
  const row4 = useMediaQuery({ minWidth: 1141 });
  const row3 = useMediaQuery({ maxWidth: 1140, minWidth: 861 });
  const row2 = useMediaQuery({ maxWidth: 860, minWidth: 787 });
  // const isMobile = useMediaQuery({ maxWidth: 786 });

  // 데이터
  const [data, setData] = useState(null);

  // 데이터 받기
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product`)
      .then((res) => setData(res.data));
  };

  // 반응형
  useEffect(() => {
    row4 && setWidth("71.25rem");
    row3 && setWidth("53.5rem");
    row2 && setWidth("36rem");
  }, [row4, row3, row2]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <MCContainer>
      <Content width={width}>
        <ShareCardContent data={data} number={8}></ShareCardContent>
      </Content>
    </MCContainer>
  );
};

export default MyPageContent;

const MCContainer = styled.div`
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
  margin: 1.5rem auto;
  width: ${(props) => props.width};
`;
