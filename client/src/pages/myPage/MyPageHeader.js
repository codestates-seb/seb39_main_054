import React from "react";
import styled from "styled-components";

const MyPageHeader = () => {
  // 프로필 이미지 업로드 코드
  // 닉네임 요청

  return (
    <MHContainer>
      <AvartarContainer>
        <AvartarWrapper>
          <img></img>
        </AvartarWrapper>
        <p>키키님 반갑습니다.</p>
      </AvartarContainer>
    </MHContainer>
  );
};

export default MyPageHeader;

const MHContainer = styled.div`
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
  margin: 5rem 0 2.3125rem 0;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.primary};

  @media ${(props) => props.theme.mobile} {
    width: 24.25rem;
    height: 6.6875rem;
    margin: 1.75rem 0 1.3125rem 0;
  }

  p {
    color: ${(props) => props.theme.white};
    font-size: 1.5rem;
    margin: 1.8rem 0 0 0;

    @media ${(props) => props.theme.mobile} {
      font-size: 0.875rem;
      margin: 0.8rem 0 0 0;
    }
  }
`;
const AvartarWrapper = styled.div`
  width: 11.25rem;
  height: 11.25rem;
  background-color: aliceblue;
  border-radius: 50%;
  @media ${(props) => props.theme.mobile} {
    width: 3.1875rem;
    height: 3.1875rem;
  }
`;
