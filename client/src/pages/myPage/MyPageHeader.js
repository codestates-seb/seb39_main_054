import React from "react";
import styled from "styled-components";

const MyPageHeader = () => {
  return (
    <>
      <MHContainer>
        <AvartarContainer>
          <AvartarWrapper>
            <img></img>
          </AvartarWrapper>
          <p>키키님 반갑습니다.</p>
        </AvartarContainer>
      </MHContainer>
    </>
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
