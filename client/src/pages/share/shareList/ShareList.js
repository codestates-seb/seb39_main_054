import React from "react";
import styled from "styled-components";
import Paginations from "../../../components/pagination/Paginations";
import ShareListContent from "./ShareListContent";
import ShareListFilter from "./ShareListFilter";

const ShareList = () => {
  return (
    <Container>
      <ShareListFilter></ShareListFilter>
      <ShareListContent></ShareListContent>
      <Paginations></Paginations>
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
  padding: 1rem 0;
`;
