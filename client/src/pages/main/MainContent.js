import React from "react";
import styled from "styled-components";

const MainContent = () => {
  return (
    <Container>
      <Content>
        <div className="title">최근 게시물</div>
        <CardContent>카드</CardContent>
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
  width: 100vw;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 71.25rem;
  margin: 4.5rem 0;

  .title {
    font-size: 1.625rem;
    font-family: "NotoSansKR-Medium";
    margin-bottom: 4.5rem;
  }
`;

const CardContent = styled.div``;
