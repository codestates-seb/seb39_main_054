import React from "react";
import styled from "styled-components";
import Pagination from "../../../components/pagination/Pagination";
import ShareListContent from "./ShareListContent";
import ShareListFilter from "./ShareListFilter";

const ShareList = () => {
  return (
    <Container>
      <ShareListFilter></ShareListFilter>
      <ShareListContent></ShareListContent>
      <Pagination></Pagination>
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
