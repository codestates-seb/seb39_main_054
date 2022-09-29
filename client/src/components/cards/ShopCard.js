import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ShopCard = () => {
  return <Container>ShopCard</Container>;
};

export default ShopCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 37.5px;
  margin-bottom: 70px;

  @media ${(props) => props.theme.mobile} {
    padding: 0 20px;
  }

  .share-status {
    display: flex;
    justify-content: space-between;

    @media ${(props) => props.theme.mobile} {
      flex-direction: column;
    }
  }

  .img-container {
    width: 210px;
    height: 210px;
    overflow: hidden;
    border-radius: 14px;
    border: 0px;
  }
`;
