import React from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import CategoryDropdown from "../../../components/dropdowns/CategoryDropdown";
import Category from "../../../components/filters/category/Category";
import Search from "../../../components/filters/search/Search";
import { PostBtn } from "../../../components/ui/buttons/buttons";

const ShopListFilter = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const roles = localStorage.getItem("roles");

  const postToggle = () => {
    navigate("/shop/post");
  };

  const categoryChange = (el) => {};

  return (
    <Container>
      {!isMobile && <Category></Category>}
      <SearchAndPostContainer>
        <div className="search-category">
          <Search>search</Search>
          {isMobile && (
            <CategoryDropdown
              categoryChange={categoryChange}
            ></CategoryDropdown>
          )}
        </div>
        {!isMobile && roles === "ROLE_ADMIN" && (
          <PostBtn onClick={postToggle}>글작성</PostBtn>
        )}
      </SearchAndPostContainer>
      {isMobile && roles === "ROLE_ADMIN" && (
        <PostBtn onClick={postToggle}>글작성</PostBtn>
      )}
    </Container>
  );
};

export default ShopListFilter;

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

  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    .search-category {
      display: flex;
    }
  }
`;
