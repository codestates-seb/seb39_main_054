import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../../assets/img/logo/ANBD-2.png";
import logoW from "../../assets/img/logo/ANBD-2-w.png";
import { ReactComponent as Sun } from "../../assets/img/icon/sun.svg";
import { ReactComponent as Moon } from "../../assets/img/icon/moon.svg";
import { ReactComponent as Bars } from "../../assets/img/icon/bars.svg";
import { useMediaQuery } from "react-responsive";
import { Link, NavLink } from "react-router-dom";
import NavDropdown from "../dropdowns/nav/NavDropdown";
import NavDropdwonMobile from "../dropdowns/nav/NavDropdwonMobile";
import { useSelector } from "react-redux";
import axios from "axios";

const Nav = ({ isTheme, setIsTheme }) => {
  // 화면 크기 (반응형 구현)
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const isLogin = useSelector((state) => state.loginReducer.isLogin);

  const [nickName, setNickName] = useState("");

  // 닉네임 클릭 드롭다운
  const [openDropDown, setOpenDropDown] = useState({
    className: "up",
  });

  // 테마 변경 함수
  const toggleTheme = () => {
    if (isTheme === "light") {
      setIsTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setIsTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  // 닉네임 버튼 클릭 (드롭다운)
  const dropdwonHandler = () => {
    if (openDropDown.className === "up") {
      setOpenDropDown({ className: "down" });
    } else {
      setOpenDropDown({ className: "up" });
    }
  };

  // 유저 닉네임 가져오기
  const getUserInfo = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("authorization")}`,
    };
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/members/${localStorage.getItem(
          "memberid"
        )}`,
        { headers: headers }
      )
      .then((res) => setNickName(res.data.nickname));
  };

  useEffect(() => {
    if (isLogin) getUserInfo();
  }, [isLogin]);

  return (
    <NavContainer>
      <NavContent>
        <NavLeft>
          <Link to="/">
            <img src={isTheme === "light" ? logo : logoW} alt="ANBD Logo" />
          </Link>
          {!isMobile && (
            <>
              <StyledNavLink to="/share/list">
                <div>공유장터</div>
              </StyledNavLink>
              <StyledNavLink to="/shop/list">
                <div>레저용품 판매점</div>
              </StyledNavLink>
            </>
          )}
        </NavLeft>
        <NavRight>
          {isTheme === "light" ? (
            <Sun onClick={toggleTheme}></Sun>
          ) : (
            <Moon onClick={toggleTheme}></Moon>
          )}
          {!isMobile ? (
            <>
              {!isLogin ? (
                <>
                  {" "}
                  <StyledNavLink to="/login">
                    <div>로그인</div>
                  </StyledNavLink>
                  <StyledNavLink to="/signup">
                    <div>회원가입</div>
                  </StyledNavLink>
                </>
              ) : (
                <div>
                  <div className="profile" onClick={dropdwonHandler}>
                    {nickName}
                  </div>
                  <NavDropdown
                    openDropDown={openDropDown}
                    dropdwonHandler={dropdwonHandler}
                  ></NavDropdown>
                </div>
              )}
            </>
          ) : (
            <div className="bars">
              <Bars onClick={dropdwonHandler}></Bars>
              <NavDropdwonMobile
                isLogin={isLogin}
                openDropDown={openDropDown}
                dropdwonHandler={dropdwonHandler}
              ></NavDropdwonMobile>
            </div>
          )}
        </NavRight>
      </NavContent>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #62bf53;
  font-size: 1.125rem;
  font-family: "NotoSansKR-Bold";
  background-color: ${(props) => props.theme.bgColor};
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 81.25rem;
  height: 100%;

  img {
    margin-right: 2rem;
    margin-top: 0.3rem;
    padding: 0.5rem;
    width: 180px;
    cursor: pointer;
  }
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-right: 2rem;
    padding: 0.5rem;
    cursor: pointer;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
  }

  div {
    margin-right: 1rem;
    padding: 0.5rem;
    cursor: pointer;
  }

  .profile {
    text-align: right;
    width: 5.5rem;
  }

  .bars {
    svg {
      width: 2rem;
      height: 2rem;
      fill: ${(props) => props.theme.textColor};
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    color: ${(props) => props.theme.primary};
  }
`;
