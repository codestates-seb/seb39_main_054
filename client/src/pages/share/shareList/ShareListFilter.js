import React from "react";
import styled from "styled-components";
import Category from "../../../components/filters/category/Category";
import Search from "../../../components/filters/search/Search";
import ShareState from "../../../components/filters/shareState/ShareState";

const ShareListFilter = () => {
  return (
    <Container>
      <Category></Category>
      <Search>search</Search>
      <ShareState>공유상태</ShareState>
    </Container>
  );
};

export default ShareListFilter;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
