import React from "react";
import styled from "styled-components";
import { DotPulse } from "@uiball/loaders";

const DataLoading = () => {
  return (
    <Background>
      <DotPulse size={80} speed={1.3} color="#62BF53" />
    </Background>
  );
};

export default DataLoading;

const Background = styled.div`
  width: 100vw;
  height: 500px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
