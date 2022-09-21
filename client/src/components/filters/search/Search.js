import React from "react";
import styled from "styled-components";
import { ReactComponent as Glass } from "../../../assets/img/icon/magnifying-glass.svg";

const Search = () => {
  return (
    <Container>
      <div>
        <Input placeholder="물품을 검색해보세요" />
        <Glass />
      </div>
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
  margin: 1rem 0;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    position: relative;
    right: 3rem;
    width: 22px;
    height: 22px;
    fill: ${(props) => props.theme.textColor};
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 30.9375rem;
  height: 4.125rem;
  background-color: ${(props) => props.theme.gray6};
  border-radius: 14px;
  border: 0;
  font-size: 18px;
  font-family: "NotoSansKR-Medium";
  padding-left: 2rem;
  padding-right: 3.5rem;
  color: ${(props) => props.theme.textColor};

  ::placeholder {
    color: ${(props) => props.theme.gray3};
  }
`;
