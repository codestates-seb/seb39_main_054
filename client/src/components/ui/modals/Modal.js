import React from "react";
import styled from "styled-components";
import { ReactComponent as Xmark } from "../../../assets/img/icon/xmark.svg";

const Modal = ({ handleModal, children, isOpen, setIsOpen }) => {
  const openModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <Container>
          <Content onClick={(e) => e.stopPropagation()}>
            <BtnXContainer>
              <button
                type="button"
                className="btn-x"
                onClick={openModalHandler}
              >
                <Xmark />
              </button>
            </BtnXContainer>
            <TitleContainer className="modal-title">
              <span>{children}</span>
            </TitleContainer>
            <ButtonContainer>
              <button
                type="button"
                className="btn btn-cancel"
                onClick={openModalHandler}
              >
                취소
              </button>
              <button
                type="button"
                className="btn btn-confirm"
                onClick={handleModal}
              >
                확인
              </button>
            </ButtonContainer>
          </Content>
        </Container>
      ) : null}
    </>
  );
};

export default Modal;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  font-family: "NotoSansKR-Bold";
`;

const Content = styled.div`
  height: 450px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  padding: 1rem;
`;

const BtnXContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;

  .btn-x {
    width: 24px;
    background-color: ${(props) => props.theme.bgColor};
  }

  svg {
    fill: ${(props) => props.theme.textColor};
    &:hover {
      filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  width: 500px;
  height: 270px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;

  .btn {
    width: 140px;
    height: 60px;
    border-radius: 10px;
    font-size: 22px;
    color: ${(props) => props.theme.white};
    margin: 0 2rem;
    &:hover {
      filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
    }

    &.btn-cancel {
      background-color: ${(props) => props.theme.gray4};
    }

    &.btn-confirm {
      background-color: ${(props) => props.theme.primary};
    }
  }
`;
