import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import ShareState from "../../components/filters/shareState/ShareState";
import MyPageHeader from "./MyPageHeader";
import MyPageContent from "./MyPageContent";

const MyPageEdit = () => {
  return (
    <>
      <MFContainer>
        <MyPageHeader />
        <BtnContainer>
          <Link to="/mypage/favorite">
            <button>관심목록</button>
          </Link>
          <Link to="/mypage/mypost">
            <button>내가 쓴 게시글</button>
          </Link>
          <Link to="/chat/list/:id">
            <button>채팅 목록</button>
          </Link>
          <Link to="/mypage/edit">
            <button className="active">회원정보 수정</button>
          </Link>
          <button>회원 탈퇴</button>
        </BtnContainer>
        <ShareStateContainer>
          <ShareState />
        </ShareStateContainer>
        <MyPageContent />
      </MFContainer>
    </>
  );
};

export default MyPageEdit;

const MFContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 53.75rem;
  height: 3.75rem;
  margin-bottom: 1.8125rem;

  button {
    width: 8.75rem;
    height: 3.75rem;
    border-radius: 0.625rem;
    border: 0.125rem solid ${(props) => props.theme.gray4};
    background-color: ${(props) => props.theme.bgColor};
    font-size: 1.125rem;
    font-family: "NotoSansKR-Bold";
    color: ${(props) => props.theme.gray3};
    :hover {
      background-color: ${(props) => props.theme.primary};
      border: none;
      color: ${(props) => props.theme.white};
    }
    &:focus {
      background-color: ${(props) => props.theme.primary};
      border: none;
      color: ${(props) => props.theme.white};
    }
  }

  .active {
    background-color: ${(props) => props.theme.primary};
    border: none;
    color: ${(props) => props.theme.white};
  }
`;

const ShareStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
