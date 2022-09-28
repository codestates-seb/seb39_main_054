import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";
import MyPageHeader from "../MyPageHeader";
import MyPageNav from "../MyPageNav";
import ModalConfirm from "../../../components/ui/modals/ModalConfirm";

const MyPageSignOut = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("authorization")}`,
  };

  // 모달창의 확인버튼을 눌렀을때의 동작
  const handleModal = () => {
    setIsOpen(!isOpen);
    // navigate(`/`);
  };

  const handleSignOut = async () => {
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/member/${id}`,
        // `${process.env.REACT_APP_API_URL}/member`,
        { memberStatus: "MEMBER_QUIT" },
        { headers: headers }
      )
      .then(() => {
        handleModal();
        console.log("ok");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <MSContainer>
        <MyPageHeader />
        <MyPageNav />
        <SignOutContainer>
          <p>정말로 회원 탈퇴를 하시겠습니까?</p>
          <p className="text-small">
            확인을 누르시면 30일 뒤 회원 정보가 삭제됩니다.
          </p>

          <Btns>
            <Link to="/mypage/favorite">
              <button className="btn-cancel">취소</button>
            </Link>
            <button
              onClick={handleSignOut}
              className="btn-confirm"
              type="submit"
            >
              확인
            </button>
          </Btns>
        </SignOutContainer>
        <ModalConfirm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleModal={handleModal}
          children={"그동안 이용해주셔서 감사합니다."}
        />
      </MSContainer>
    </>
  );
};

export default MyPageSignOut;

const MSContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
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
