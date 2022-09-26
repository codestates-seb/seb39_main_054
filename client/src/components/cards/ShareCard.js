import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Heart } from "../../assets/img/icon/heart.svg";

const ShareCard = ({ id, title, content, status, image01 }) => {
  return (
    <Link to={`/share/detail/${id}`}>
      <Container>
        <div className="img-container">
          <Img src={image01}></Img>
        </div>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <div className="share-status">
          <ShareState status={status}>
            <div className="circle"></div>
            {status}
          </ShareState>
          <Favorite>
            <Heart />
            13
          </Favorite>
        </div>
      </Container>
    </Link>
  );
};

export default ShareCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 37.5px;
  margin-bottom: 70px;

  .share-status {
    display: flex;
    justify-content: space-between;
  }

  .img-container {
    width: 210px;
    height: 210px;
    overflow: hidden;
    border-radius: 14px;
    border: 0px;
    margin-bottom: 13px;
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
  width: 210px;
  font-size: 18px;
  font-family: "NotoSansKR-Medium";
  line-height: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Content = styled.div`
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
`;

const ShareState = styled.div`
  display: flex;
  font-size: 13px;

  .circle {
    width: 13px;
    height: 13px;
    /* 상태값에 따라 색상 변경 */
    background-color: ${(props) =>
      props.status === "대여가능"
        ? props.theme.stateGreen
        : props.status === "대여중"
        ? props.theme.stateBlue
        : props.theme.stateRed};
    border: 0;
    border-radius: 25px;
    margin-right: 6px;
  }
`;

const Favorite = styled.div`
  display: flex;
  font-size: 13px;

  svg {
    fill: ${(props) => props.theme.gray4};
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
`;
