import React from "react";
import styled from "styled-components";
import Category from "../../../components/category/Category";
import Search from "../../../components/search/Search";

const ShareListFilter = () => {
  return (
    <Container>
      <Category></Category>
      <Search>search</Search>
      <div>공유상태</div>
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
