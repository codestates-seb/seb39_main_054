import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostDropdown from "../../../components/dropdowns/PostDropdown";
import Category from "../../../components/filters/category/Category";
import Search from "../../../components/filters/search/Search";
import ShareState from "../../../components/filters/shareState/ShareState";
import { PostBtn } from "../../../components/ui/buttons/buttons";

const ShareListFilter = () => {
  const navigate = useNavigate();

  const postToggle = () => {
    navigate("/share/post")
  }

  const categoryChange= (el) => {
    console.log(el)
  }

  return (
    <Container>
      <Category></Category>
      <SearchAndPostContainer>
        <Search>search</Search>
        {/* <PostDropdown categoryChange={categoryChange}></PostDropdown> */}
        <PostBtn onClick={postToggle}>글작성</PostBtn>
      </SearchAndPostContainer>
      <ShareState>공유상태</ShareState>
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

const SearchAndPostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

