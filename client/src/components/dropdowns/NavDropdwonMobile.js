import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavDropdwonMobile = ({ isLogin, openDropDown }) => {
  return (
    <Container isLogin={isLogin} openDropDown={openDropDown}>
      <Link to="/share/list">
        <li>공유장터</li>
      </Link>
      <Link to="/shop/list">
        <li>레저용품 판매점</li>
      </Link>
      {!isLogin ? (
        <>
          <Link to="/login">
            <li>로그인</li>
          </Link>
          <Link to="/signup">
            <li>회원가입</li>
          </Link>
        </>
      ) : (
        <>
          <Link to="/mypage/favorite">
            <li>관심 목록</li>
          </Link>
          <Link to="/mypage/mypost">
            <li>내가 쓴 게시물</li>
          </Link>
          <Link to="/chat/list:id">
            <li>채팅 목록</li>
          </Link>
          <Link to="/mypage/edit">
            <li>회원정보 수정</li>
          </Link>
          <li>로그아웃</li>
        </>
      )}
    </Container>
  );
};

export default NavDropdwonMobile;

const Container = styled.ul`
  position: absolute;
  display: flex ;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 68px;
  left: 0;
  width: 100%;
  color: ${(props) => props.theme.gray2};
  background-color: ${(props) => props.theme.bgColor};
  height: ${(props) => (props.openDropDown.className === "up" ? "0px" : "22.75rem")};
  // "13.75rem" : "22.75rem"
  transition: height 1.3s;
  font-size: 15px;
  font-family: "NotoSansKR-Medium";
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px;
  z-index: 100;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.125rem;

    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }
`;
