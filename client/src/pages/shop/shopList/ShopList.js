import React from "react";
import styled from "styled-components";
import Paginations from "../../../components/pagination/Paginations";
import ShopListContent from "./ShopListContent";
import ShopListFilter from "./ShopListFilter";

const ShopList = () => {
  return (
    <Container>
      <ShopListFilter></ShopListFilter>
      <ShopListContent></ShopListContent>
      <Paginations></Paginations>
    </Container>
  );
};

export default ShopList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
`;
