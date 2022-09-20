import React from "react";
import styled from "styled-components";
import { ReactComponent as Heart } from "../../assets/img/icon/heart.svg";

const ShareCard = () => {
  return (
    <Container>
      <Img></Img>
      <Title>텐트 대여합니다</Title>
      <Content>
        텐트 대여합니다. 상태는 어쩌구저쩌구 블라블라블라블라 텐트 대여합니다.
        상태는 어쩌구저쩌구 블라블라블라블라텐트 대여합니다. 상태는 어쩌구저쩌구
        블라블라블라블라
      </Content>
      <div className="share-status">
        <ShareState>
          <div className="circle"></div>대여가능
        </ShareState>
        <Favorite>
          <Heart />
          13
        </Favorite>
      </div>
    </Container>
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

const Img = styled.div`
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
    width: 13px;
    height: 13px;
    margin-right: 6px;
  }
`;
