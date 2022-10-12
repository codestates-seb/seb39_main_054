import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Down } from "../../assets/img/icon/caret-down.svg";
import { ReactComponent as Up } from "../../assets/img/icon/caret-up.svg";

const MyPageDropdownMobile = ({ categoryChange }) => {
  const memberId = localStorage.getItem("memberid");
  const [choice, setChoice] = useState("관심 목록");
  const [open, setOpen] = useState({
    className: "up",
    height: "0px",
    display: "none",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const category = [
    "관심 목록",
    "내가 쓴 게시물",
    "채팅 목록",
    "회원정보 수정",
    "회원 탈퇴",
  ];

  const link = [
    "/mypage/favorite",
    "/mypage/mypost",
    `/chat/list/${memberId}`,
    `/mypage/edit/${memberId}`,
    "/mypage/signout",
  ];

  const handleLink = (el) => {
    for (let i = 0; i < 5; i++) {
      if (el === category[i]) navigate(link[i]);
    }
  };

  const clickCategoty = () => {
    if (open.className === "up") {
      setOpen({ className: "down", height: "300px", display: "flex" });
    } else {
      setOpen({ className: "up", height: "0px", display: "none" });
    }
  };
  const menuClick = () => {
    categoryChange(choice);
  };
  useEffect(() => {
    menuClick();
  }, [choice]);

  useEffect(() => {
    for (let j = 0; j < 5; j++) {
      if (location.pathname === link[j]) setChoice(category[j]);
    }
  }, []);

  return (
    <Container>
      <TagBtn onClick={clickCategoty}>
        {" "}
        {choice}
        {open.className === "up" ? <DownBtn /> : <UpBtn />}
      </TagBtn>
      <Ul
        display={open.display}
        height={open.height}
        className={open.className}
      >
        {category.map((el) => (
          <li
            onClick={() => {
              handleLink(el);
              menuClick();
              setChoice(el);
              setOpen({ className: "up", height: "0px", display: "none" });
            }}
          >
            {el}
          </li>
        ))}
      </Ul>
    </Container>
  );
};
export default MyPageDropdownMobile;

const Container = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
`;

const TagBtn = styled.button`
  width: 12rem;
  height: 3.44rem;
  background-color: ${(props) => props.theme.bgColor};
  font-size: 1.2rem;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  font-family: "NotoSansKR-Medium";

  @media ${(props) => props.theme.mobile} {
    width: 19.8125rem;
    height: 3.0625rem;
    font-size: 15px;
  }
`;

const Ul = styled.ul`
  position: absolute;
  display: ${(props) => props.display};
  flex-direction: column;
  font-size: 1.2rem;
  font-family: "NotoSansKR-Medium";
  background-color: ${(props) => props.theme.bgColor};
  margin-top: 3.4rem;
  opacity: 0.9;

  border-radius: 10px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  overflow: hidden;
  height: ${(props) => props.height};
  animation-name: ${(props) => props.className};
  animation-duration: 1s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px;
  z-index: 100;
  text-align: center;

  @media ${(props) => props.theme.mobile} {
    width: 19.8125rem;
    height: 16rem;
    font-size: 15px;
  }

  li {
    padding: 17.5px 0;

    &:hover {
      color: ${(props) => props.theme.primary};
    }
    cursor: pointer;
  }

  @keyframes up {
    0% {
      height: 300px;
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
      height: 300px;
    }
  }
`;
const DownBtn = styled(Down)`
  width: 1rem;
  height: 1rem;
  fill: ${(props) => props.theme.primary};
  margin: 0rem -2rem 0rem 1em;
`;
const UpBtn = styled(Up)`
  width: 1rem;
  height: 1rem;
  fill: ${(props) => props.theme.primary};
  margin: 0rem -2rem 0rem 1em;
`;
