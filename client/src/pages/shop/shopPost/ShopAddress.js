import React from "react";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";

const ShopAddress = ({ addressChange, isOpen, addressIsOpen }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
      addressChange(fullAddress);
      addressIsOpen();
    }
  };
  return (
    <>
      {isOpen ? (
        <Container>
          <CloseBtn onClick={() => addressIsOpen()}>닫기</CloseBtn>
          <DaumPostCode onComplete={handleComplete} autoClose />
        </Container>
      ) : null}
    </>
  );
};

export default ShopAddress;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 0 20rem;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 2rem;
  border-radius: 14px 14px 0 0;
  background-color: ${(props) => props.theme.white};
  font-size: 1.1rem;
`;
