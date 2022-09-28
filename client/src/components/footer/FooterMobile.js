import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/logo/ANBD-3.png";

const FooterMobile = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterTopContent>
            <div className="footer-team-name">TEAM ANBD</div>
            <div>Email: alsalsdyd@gmail.com</div>
            <div>tell: 010-1234-xxxx</div>
          </FooterTopContent>
          <img src={logo} alt="ANBD logo" />
        </FooterTop>
        <FooterButtom>
          <div className="footer-team-name"></div>
          <div>대표자: 조민우, 염혜지, 이혜진, 정재진, 조진우</div>
          <div>
            주소: 서울특별시 서초구 서초대로 396, 강남빌딩 20층 (코드스테이츠)
          </div>
        </FooterButtom>
      </FooterContent>
    </FooterContainer>
  );
};

export default FooterMobile;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
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
  justify-content: left;
  align-items: center;
  flex-direction: column;
  width: 28.75rem;
  height: 100%; 
  padding: 2rem 0;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  width: 100%;

  img {
    width: 70px;
    height: 70px;
    cursor: pointer;
  }
`;

const FooterTopContent = styled.div`
  width: 18.75rem;
`;

const FooterButtom = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  padding: 0 1rem;
  width: 100%;

  div {
    padding: 2px;
  }
`;
