import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/logInAction";

const NavDropdown = ({ openDropDown }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("authorization");
    localStorage.removeItem("memberid");
    navigate("/");
  };

  return (
    <Ul display={openDropDown.display} className={openDropDown.className}>
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
      <li onClick={handleLogout}>로그아웃</li>
    </Ul>
  );
};

export default NavDropdown;

const Ul = styled.ul`
  position: absolute;
  display: ${(props) => props.display};
  flex-direction: column;
  font-size: 1.0625rem;
  font-family: "NotoSansKR-Medium";
  color: ${(props) => props.theme.gray2};
  background-color: ${(props) => props.theme.bgColor};
  top: 68px;
  width: 185px;
  height: 15.725rem;
  border-radius: 14px;
  overflow: hidden;
  height: ${(props) => props.height};
  animation-name: ${(props) => props.className};
  animation-duration: 2s;
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

  @keyframes up {
    0% {
      height: 15.725rem;
    }
    100% {
      height: 0px;
    }
  }

  @keyframes down {
    0% {
      height: 0px;
    }
    100% {
      height: 15.725rem;
    }
  }
`;
