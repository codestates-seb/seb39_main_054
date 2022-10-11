import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/logInAction";

const NavDropdown = ({ openDropDown, dropdwonHandler }) => {
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
    <Ul className={openDropDown.className}>
      {dropwDownContent.map((el, idx) => (
        <StyledNavLink to={el[1]} key={idx} onClick={dropdwonHandler}>
          <li>{el[0]}</li>
        </StyledNavLink>
      ))}
      <li
        onClick={() => {
          handleLogout();
          dropdwonHandler();
        }}
      >
        로그아웃
      </li>
    </Ul>
  );
};

export default NavDropdown;

const Ul = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  font-size: 1.0625rem;
  font-family: "NotoSansKR-Medium";
  top: 68px;
  width: 185px;
  height: ${(props) => (props.className === "up" ? "0px" : "15.725rem")};
  color: ${(props) => props.theme.gray2};
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 14px;
  overflow: hidden;
  transition: height 1.3s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px;
  z-index: 100;

  li {
    display: flex;
    align-items: center;
    padding: 17.5px 0;
    margin-left: 1.5rem;
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
