import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Heart } from "../../assets/img/icon/heart.svg";

const ShareCard = ({
  id,
  title,
  description,
  status,
  image01,
  favoriteCount,
  favoriteStatus,
}) => {
  return (
    <Container>
      <Link to={`/share/detail/${id}`}>
        <Content>
          <div className="img-container">
            {image01 !== undefined ? (
              <Img src={image01.imageUrl}></Img>
            ) : (
              <Img className="image-undefinded"></Img>
            )}
          </div>
          <div className="text-content">
            <Title>{title}</Title>
            <Description>{description}</Description>
            <div className="share-status">
              <ShareState status={status}>
                <div className="circle"></div>
                {status}
              </ShareState>
              <Favorite favoriteStatus ={favoriteStatus}>
                <Heart/>
                {favoriteCount}
              </Favorite>
            </div>
          </div>
        </Content>
      </Link>
    </Container>
  );
};

export default ShareCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 37.5px;
  margin-bottom: 70px;

  @media ${(props) => props.theme.mobile} {
    padding: 0 20px;
    margin-bottom: 2.5rem;
  }

  .share-status {
    display: flex;
    justify-content: space-between;

    @media ${(props) => props.theme.mobile} {
      flex-direction: column;
    }
  }

  .img-container {
    width: 210px;
    height: 210px;
    overflow: hidden;
    border-radius: 14px;
    border: 0px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media ${(props) => props.theme.mobile} {
    flex-direction: row;

    .text-content {
      display: flex;
      flex-direction: column;
      padding: 0 13px;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.2s linear;

  &:hover {
    transform: scale(1.2);
  }

  .image-undefinded {
    background-color: ${(props) => props.theme.gray5};
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

const Description = styled.div`
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

  @media ${(props) => props.theme.mobile} {
    margin-top: 0;
    margin-bottom: 40px;
    width: 9.25rem;
    height: 3.75rem;
    -webkit-line-clamp: 3;
  }
`;

const ShareState = styled.div`
  display: flex;
  font-size: 13px;

  @media ${(props) => props.theme.mobile} {
    margin-bottom: 10px;
  }

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
    fill: ${(props) => (props.favoriteStatus ? "#ED4956" : props.theme.gray4)};
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
`;
