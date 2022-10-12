import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../../redux/actions/logInAction";

const NavDropdwonMobile = ({ isLogin, openDropDown, dropdwonHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberid");
  const dropwDownContent = [
    ["관심 목록", `/mypage/favorite`],
    ["내가 쓴 게시물", `/mypage/mypost`],
    ["채팅 목록", `/chat/list/${memberId}`],
    ["회원정보 수정", `/mypage/edit/${memberId}`],
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authorization");
    localStorage.removeItem("memberid");
    navigate("/");
  };

  return (
    <Container isLogin={isLogin} openDropDown={openDropDown}>
      <StyledNavLink to="/share/list" onClick={dropdwonHandler}>
        <li>공유장터</li>
      </StyledNavLink>
      <StyledNavLink to="/shop/list" onClick={dropdwonHandler}>
        <li>레저용품 판매점</li>
      </StyledNavLink>
      {!isLogin ? (
        <>
          <StyledNavLink to="/login" onClick={dropdwonHandler}>
            <li>로그인</li>
          </StyledNavLink>
          <StyledNavLink to="/signup" onClick={dropdwonHandler}>
            <li>회원가입</li>
          </StyledNavLink>
        </>
      ) : (
        <>
          {dropwDownContent.map((el, idx) => (
            <StyledNavLink to={el[1]} key={idx} onClick={dropdwonHandler}>
              <li>{el[0]}</li>
            </StyledNavLink>
          ))}
          <li
            onClick={() => {
              dropdwonHandler();
              handleLogout();
            }}
          >
            로그아웃
          </li>
        </>
      )}
    </Container>
  );
};

export default NavDropdwonMobile;

const Container = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 68px;
  left: 0;
  width: 100%;
  color: ${(props) => props.theme.gray2};
  background-color: ${(props) => props.theme.bgColor};
  height: ${(props) =>
    props.openDropDown.className === "up"
      ? "0px"
      : props.isLogin
      ? "22.75rem"
      : "13.75rem"};
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

const StyledNavLink = styled(NavLink)`
  &.active {
    color: ${(props) => props.theme.primary};
  }
`;
