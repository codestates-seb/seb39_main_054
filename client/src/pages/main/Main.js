import React from "react";
import styled from "styled-components";
import Carousel from "../../components/carousel/Carousel";
import MainContent from "./MainContent";

const Main = () => {
  return (
    <MainContainer>
      <Carousel></Carousel>
      <MainContent></MainContent>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`
