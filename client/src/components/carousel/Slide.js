import React from "react";
import styled from "styled-components";

const Slide = ({ img }) => {
  return (
    <>
      <Img src={img}></Img>
    </>
  );
};

export default Slide;

const Img = styled.img`
  width: 100vw;
  height: 100%;
  object-fit: cover;
`;
