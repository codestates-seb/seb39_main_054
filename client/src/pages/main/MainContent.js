import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ShareCard from "../../components/cards/ShareCard";
import { useMediaQuery } from "react-responsive";

const MainContent = () => {
  // 반응형으로 틀의 크기잡기
  const [width, setWidth] = useState("71.25rem");
  // 반응형 별 카드 갯수
  const row4 = useMediaQuery({ minWidth: 1141 });
  const row3 = useMediaQuery({ maxWidth: 1140, minWidth: 861 });
  const row2 = useMediaQuery({ maxWidth: 860, minWidth: 787 });
  // const isMobile = useMediaQuery({ maxWidth: 786 });

  useEffect(() => {
    row4 && setWidth("71.25rem");
    row3 && setWidth("53.5rem");
    row2 && setWidth("36rem");
  }, [row4, row3, row2]);

  return (
    <Container>
      <Content width={width}>
        <div className="title">최근 게시물</div>
        <CardContent>
          <ShareCard></ShareCard>
          <ShareCard></ShareCard>
          <ShareCard></ShareCard>
          <ShareCard></ShareCard>
          <ShareCard></ShareCard>
          <ShareCard></ShareCard>
          <ShareCard></ShareCard>
          <ShareCard></ShareCard>
        </CardContent>
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
  width: ${(props) => props.width};

  .title {
    font-size: 1.625rem;
    font-family: "NotoSansKR-Medium";
    margin-bottom: 4.5rem;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
