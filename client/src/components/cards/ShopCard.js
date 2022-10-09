import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ShopCard = ({ id, title, address, tel, scategory, image01 }) => {
  return (
    <Container>
      <Link to={`/shop/detail/${id}`}>
        <Content>
          <div className="img-container">
            <Img src={image01[0].imageUrl}></Img>
          </div>
          <div className="text-content">
            <Title>{title}</Title>
            <hr></hr>
            <Address>
              <div className="address">주소</div>
              <div className="address-text">{address}</div>
            </Address>
            <Tel>
              <div className="tel">전화번호</div>
              <div className="tel-text">{tel}</div>
            </Tel>
            <Category>{scategory}</Category>
          </div>
        </Content>
      </Link>
    </Container>
  );
};

export default ShopCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 37.5px;
  margin-bottom: 70px;

  @media ${(props) => props.theme.mobile} {
    padding: 0 20px;
  }

  .img-container {
    width: 210px;
    height: 210px;
    overflow: hidden;
    border-radius: 14px;
    border: 0px;
  }

  hr {
    margin: 0.5rem 0rem;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;

  .text-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 13px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.2);
  }
`;

const Title = styled.div`
  width: 13.125rem;
  font-size: 18px;
  font-family: "NotoSansKR-Medium";
  line-height: 1.2rem;
  margin-top: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${(props) => props.theme.mobile} {
    margin-top: 0.3rem;
    margin-bottom: 23px;
    width: 9.25rem;
  }
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  width: 210px;
  margin: 10px 0;
  height: 2.5rem;
  line-height: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  .address {
    font-family: "NotoSansKR-Medium";
  }
`;

const Tel = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  width: 210px;
  margin: 10px 0;
  height: 2.5rem;
  line-height: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  .tel {
    font-family: "NotoSansKR-Medium";
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.gray6};
  font-size: 13px;
  font-family: "NotoSansKR-Medium";
  width: 3.5rem;
  padding: 4px 0;
  background-color: ${(props) => props.theme.gray3};
  border-radius: 10px;
`;
