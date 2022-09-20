import React from "react";
import styled from "styled-components";
import { ReactComponent as Glass } from "../../assets/img/icon/magnifying-glass.svg";

const Search = () => {
  return (
    <Container>
      <Input placeholder="물품을 검색해보세요"></Input>
    </Container>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  width: 30.9375rem;
  height: 4.125rem;
  background-color: ${(props) => props.theme.gray6};
  border-radius: 14px;
  border: 0;
  font-size: 18px;
  font-family: "NotoSansKR-Medium";
  text-indent: 2rem;
  color: ${(props) => props.theme.textColor};
  ::placeholder {
    color: ${(props) => props.theme.gray3};
  }
`;
