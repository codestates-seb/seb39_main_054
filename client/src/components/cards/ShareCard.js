import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Heart } from "../../assets/img/icon/heart.svg";

const ShareCard = ({ id, title, content, status, image01 }) => {
  return (
    <Link to={`/share/detail/${id}`}>
      <Container>
        <Img src={image01}></Img>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <div className="share-status">
          <ShareState>
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
`;

const Img = styled.img`
  background-color: #222222;
  width: 210px;
  height: 210px;
  border-radius: 14px;
  border: 0px;
  margin-bottom: 13px;
`;

const Title = styled.div`
  font-size: 18px;
  font-family: "NotoSansKR-Medium";
`;

const Content = styled.div`
  font-size: 15px;
  width: 210px;
  margin: 10px 0;
  height: 2rem;
  line-height: 1rem;
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
    background-color: ${(props) => props.theme.stateGreen};
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
