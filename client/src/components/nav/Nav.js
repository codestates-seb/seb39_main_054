import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/logo/ANBD-2.png";
import logoW from "../../assets/img/logo/ANBD-2-w.png";
import { ReactComponent as Sun } from "../../assets/img/icon/sun.svg";
import { ReactComponent as Moon } from "../../assets/img/icon/moon.svg";
import { ReactComponent as Bars } from "../../assets/img/icon/bars.svg";
import { useMediaQuery } from "react-responsive";

const Nav = ({ isTheme, setIsTheme }) => {
  const isMobile = useMediaQuery({ maxWidth: 786 });

  const toggleTheme = () => {
    if (isTheme === "light") {
      setIsTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setIsTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <NavContainer>
      <NavContent>
        <NavLeft>
          <img src={isTheme === "light" ? logo : logoW} alt="ANBD Logo" />
          {!isMobile && (
            <>
              <div>공유장터</div>
              <div>레저용품 판매점</div>
            </>
          )}
        </NavLeft>
        <NavRight>
          {isTheme === "light" ? (
            <Sun witdth="2.5rem" height="2.5rem" onClick={toggleTheme}></Sun>
          ) : (
            <Moon witdth="2.5rem" height="2.5rem" onClick={toggleTheme}></Moon>
          )}
          {!isMobile ? (
            <>
              <div>로그인</div>
              <div>회원가입</div>
            </>
          ) : (
            <div className="bars">
              <Bars witdth="2rem" height="2rem"></Bars>
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
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 81.25rem;
  height: 100%;

  img {
    margin-right: 2rem;
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
    cursor: pointer;
  }

  div {
    margin-right: 1rem;
    padding: 0.5rem;
    cursor: pointer;
  }

  .bars{
    svg{
      fill: ${props => props.theme.textColor};
    }
  }
`;
