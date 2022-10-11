import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { serachSelect } from "../../../redux/actions/filtersAction";
import { ReactComponent as Glass } from "../../../assets/img/icon/magnifying-glass.svg";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const searchHandler = (el) => {
    if (el === "Enter" || el === "click") {
      dispatch(serachSelect(searchText));
    }
  };

  return (
    <Container>
      <div>
        <Input
          onKeyDown={(el) => searchHandler(el.key)}
          onChange={(el) => setSearchText(el.target.value)}
          placeholder="물품을 검색해보세요"
        />
        <Glass onClick={(el) => searchHandler(el.type)} />
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

  div {
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

    @media ${(props) => props.theme.mobile} {
      width: 18px;
      height: 18px;
      right: 2rem;
    }
  }
`;

const Input = styled.input`
  width: 30.9375rem;
  height: 4.125rem;
  background-color: ${(props) => props.theme.gray5};
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

  @media ${(props) => props.theme.mobile} {
    width: 13.75rem;
    height: 2.5rem;
    padding-left: 1rem;
    padding-right: 2.5rem;
  }
`;
