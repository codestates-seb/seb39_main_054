import React from "react";
import styled from "styled-components";
import ShareListContent from "./ShareListContent";
import ShareListFilter from "./ShareListFilter";

const ShareList = () => {
  return (
    <Container>
      <ShareListFilter></ShareListFilter>
      <ShareListContent></ShareListContent>
    </Container>
  );
};

export default ShareList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
