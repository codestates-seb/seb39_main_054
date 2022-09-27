import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import MyPageHeader from "./MyPageHeader";
import Modal from "../../components/ui/modals/Modal";

const MyPageSignOut = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // 모달창의 확인버튼을 눌렀을때의 동작
  const handleModal = () => {
    setIsOpen(!isOpen);
    navigate(`/`);
  };

  return (
    <>
      <MFContainer>
        <MyPageHeader />
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
          <Link to="/mypage/edit">
            <button>회원정보 수정</button>
          </Link>
          <Link to="/mypage/signout">
            <button>회원 탈퇴</button>
          </Link>
        </BtnContainer>
        <SignOutContainer>
          <p>정말로 회원 탈퇴를 하시겠습니까?</p>
          <p className="text-small">
            확인을 누르시면 30일 뒤 회원 정보가 삭제됩니다.
          </p>

          <Btns>
            <Link to="/mypage/favorite">
              <button className="btn-cancel">취소</button>
            </Link>
            <button className="btn-confirm" type="submit">
              확인
            </button>
          </Btns>
        </SignOutContainer>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleModal={handleModal}
          children={"회원정보가 변경되었습니다."}
        />
      </MFContainer>
    </>
  );
};

export default MyPageSignOut;

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

const SignOutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 7rem 0 7rem 0;

  p {
    color: ${(props) => props.theme.textColor};
    font-size: 1.8rem;
    font-family: "NotoSansKR-Medium";
  }
  .text-small {
    margin-top: 0.8rem;
    font-size: 1rem;
    font-family: "NotoSansKR-DemiLight";
  }
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3rem auto;
  width: 12rem;

  .btn-cancel {
    background-color: ${(props) => props.theme.gray4};
    color: ${(props) => props.theme.white};
    font-size: 1.1rem;
    width: 5.4rem;
    height: 2.9rem;
    border-radius: 0.625rem;
    font-family: "NotoSansKR-Medium";
    :hover {
      filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
    }
  }

  .btn-confirm {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.white};
    font-size: 1.1rem;
    width: 5.4rem;
    height: 2.9rem;
    border-radius: 0.625rem;
    font-family: "NotoSansKR-Medium";
    :hover {
      filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
    }
  }
`;
