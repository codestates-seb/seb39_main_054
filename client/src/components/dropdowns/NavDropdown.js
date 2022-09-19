import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavDropdown = ({ openDropDown }) => {

  return (
    <Ul display={openDropDown.display} height={openDropDown.height} class={openDropDown.class}>
      <Link to="/mypage/favorite">
        <li>관심목록</li>
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
    </Ul>
  );
};

export default NavDropdown;

const Ul = styled.ul`
  position: absolute;
  display: ${props => props.display};
  flex-direction: column;
  font-size: 1.0625rem;
  font-family: "NotoSansKR-Medium";
  color: ${(props) => props.theme.gray2};
  background-color: ${props=> props.theme.bgColor};
  margin-top: 1.4rem;
  width: 185px;
  border-radius: 14px;
  overflow: hidden;
  height: ${props => props.height};
  animation-name: ${props => props.class};
  animation-duration: 1s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px;

  li {
    padding: 17.5px 0;
    margin-left: 1.5rem;
    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }

  @keyframes up {
    0% {
      height: 250px;
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
      height: 250px;
    }
  }
`;
