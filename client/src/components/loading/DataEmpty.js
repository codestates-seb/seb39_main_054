import React from "react";
import styled from "styled-components";

const ListDataEmpty = () => {
  return <Container>게시글이 존재하지 않습니다.</Container>;
};

export default ListDataEmpty;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  font-size: 1.5rem;
`;
