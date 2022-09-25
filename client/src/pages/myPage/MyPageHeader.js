import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MyPageHeader = () => {
  return (
    <>
      <Container>
        <AvartarContainer>
          <AvartarWrapper>
            <img></img>
          </AvartarWrapper>
          <p>키키님 반갑습니다.</p>
        </AvartarContainer>
        <BtnContainer>
          <Link to="/mypage/favorite">
            <button className="active">관심목록</button>
          </Link>
          <Link to="/mypage/mypost">
            <button>내가 쓴 게시글</button>
          </Link>
          <Link to="/chat/list/:id">
            <button>채팅 목록</button>
          </Link>
          <Link to="/shop/edit">
            <button>회원정보 수정</button>
          </Link>
          <button>회원 탈퇴</button>
        </BtnContainer>
      </Container>
    </>
  );
};

export default MyPageHeader;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AvartarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 79.625rem;
  height: 18.25rem;
  margin: 5.875rem 0 2.3125rem 0;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.primary};

  p {
    color: ${(props) => props.theme.white};
    font-size: 1.5rem;
    margin: 1.8rem 0 0 0;
  }
`;
const AvartarWrapper = styled.div`
  width: 11.25rem;
  height: 11.25rem;
  background-color: aliceblue;
  border-radius: 50%;
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
