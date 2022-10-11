import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const MyPageNav = () => {
  const memberId = localStorage.getItem("memberid");

  return (
    <BtnContainer>
      <StyledLink to="/mypage/favorite">관심목록</StyledLink>
      <StyledLink to="/mypage/mypost">내가 쓴 게시글</StyledLink>
      <StyledLink to={`/chat/list/${memberId}`}>채팅 목록</StyledLink>
      <StyledLink to={`/mypage/edit/${memberId}`}>회원정보 수정</StyledLink>
      <StyledLink to="/mypage/signout">회원 탈퇴</StyledLink>
    </BtnContainer>
  );
};

export default MyPageNav;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 53.75rem;
  height: 3.75rem;
  margin-bottom: 1.8125rem;
`;

const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8.75rem;
  height: 3.75rem;
  border-radius: 0.625rem;
  border: 0.125rem solid ${(props) => props.theme.gray4};
  background-color: ${(props) => props.theme.bgColor};
  font-size: 1.125rem;
  font-family: "NotoSansKR-Bold";
  color: ${(props) => props.theme.gray3};

  :hover {
    background-color: ${(props) => props.theme.primary};
    border: none;
    color: ${(props) => props.theme.white};
  }

  &.active {
    background-color: ${(props) => props.theme.primary};
    border: none;
    color: ${(props) => props.theme.white};
  }
`;
