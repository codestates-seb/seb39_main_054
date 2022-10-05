import React from "react";
import styled from "styled-components";

const ShopDetailTitle = ({ data }) => {
  return (
    <TitleContainer>
      <TitleProfile>
        <TitleImage src={data.image[0]} />
      </TitleProfile>
      <TitleMiddle>
        <Title>{data.title}</Title>
        <AddressName>
          주소 <Address> {data.address}</Address>
        </AddressName>
      </TitleMiddle>
      <TitleTel>
        전화번호 <Tel>{data.tel}</Tel>
      </TitleTel>
    </TitleContainer>
  );
};

export default ShopDetailTitle;

const TitleContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const TitleProfile = styled.div`
  width: 5.31rem;
  height: 5.31rem;
  border-radius: 50%;
  overflow: hidden;
  flex-grow: 1;
`;

const TitleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleMiddle = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  padding: 0 1.5rem;
  width: 36.25rem;
  flex-grow: 2;
`;

const Title = styled.span`
  font-size: 30px;
  font-family: "NotoSansKR-Medium";
  padding-bottom: 7px;
`;

const AddressName = styled.div`
  padding-top: 7px;
  font-size: 20px;
  font-family: "NotoSansKR-Medium";
`;

const Address = styled.span`
  font-family: "NotoSansKR-Regular";
`;

const TitleTel = styled.div`
  padding-top: 2.5rem;
  font-size: 20px;
  flex-grow: 1;
`;

const Tel = styled.span`
  font-family: "NotoSansKR-Regular";
`;
