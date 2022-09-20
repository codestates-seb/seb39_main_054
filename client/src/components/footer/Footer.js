import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/logo/ANBD-3.png";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <img src={logo} />
        <FooterMiddle>
          <div className="footer-team-name">TEAM ANBD</div>
          <div>Email: alsalsdyd@gmail.com</div>
          <div>tell: 010-1234-xxxx</div>
        </FooterMiddle>
        <FooterRight>
          <div className="footer-team-name"></div>
          <div>대표자: 조민우, 염혜지, 이혜진, 정재진, 조진우</div>
          <div>
            주소: 서울특별시 서초구 서초대로 396, 강남빌딩 20층 (코드스테이츠)
          </div>
        </FooterRight>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 206px;
  border-top: 1px solid ${(props) => props.theme.primary};
  font-size: 1.125rem;

  .footer-team-name{
    padding: 0.5rem 0;
  }
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: left;
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

  div{
    padding: 2px;
  }
`;

const FooterRight = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 1.5rem;
  div{
    padding: 2px;
  }
`;
