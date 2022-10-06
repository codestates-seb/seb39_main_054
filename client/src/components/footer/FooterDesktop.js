import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/img/logo/ANBD-3.png";

const FooterDesktop = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <img src={logo} alt="ANBD logo" />
        <FooterMiddle>
          <div className="footer-team-name">TEAM ANBD</div>
          <div>
            <a href="https://github.com/codestates-seb/seb39_main_054">
              Github Link
            </a>
          </div>
          <div>anbd@gmail.com</div>
        </FooterMiddle>
        <FooterRight>
          <div className="footer-team-name"></div>
          <div>대표자: 조민우, 염혜지, 이혜진, 정재진, 조진우</div>
          <div>Copyright 2022. ANBD All rights reserved.</div>
        </FooterRight>
      </FooterContent>
    </FooterContainer>
  );
};

export default FooterDesktop;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 206px;
  border-top: 1px solid ${(props) => props.theme.primary};
  font-size: 1.125rem;

  .footer-team-name {
    padding: 0.5rem 0;
    height: 2rem;
    font-family: "NotoSansKR-Bold";
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 81.25rem;
  height: 100%;

  img {
    margin: 0.5rem;
    width: 70px;
    height: 70px;
    cursor: pointer;
  }
`;

const FooterMiddle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 1.5rem;

  div {
    padding: 2px;
  }
`;

const FooterRight = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 1.5rem;

  div {
    padding: 2px;
  }
`;
