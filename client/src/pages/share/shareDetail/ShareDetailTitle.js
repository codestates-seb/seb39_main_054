import React, { useState } from "react";
import { ReactComponent as Heart } from "../../../assets/img/icon/heart.svg";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";
import defaultAvatar from "../../../assets/img/avatar/avatar.jpg";

const ShareDetailTitle = ({ data, myAvatar }) => {
  const { id } = useParams();

  // 좋아요 등록
  const favoriteClick = async () => {
    // header에 토큰값 기본으로 넣기
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "authorization"
    )}`;
    if (data.favoriteStatus === false) {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/v1/favorites/${id}`)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 300);
        })
        .catch(() => alert("로그인을 해주세요!"));
    } else {
      await axios
        .delete(`${process.env.REACT_APP_API_URL}/v1/favorites/${id}`)
        .then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 300);
        });
    }
  };

  return (
    <STContainer>
      <Div className="profile">
        <Div className="flexboxContainer">
          <Div className="flexbox">
            <Div className="profileimg">
              {" "}
              {myAvatar ? (
                <AvartarWrapper src={myAvatar}></AvartarWrapper>
              ) : (
                <AvartarWrapper src={defaultAvatar}></AvartarWrapper>
              )}
            </Div>
            <Div className="middle">{data.member.nickname}</Div>
          </Div>
          <Div className="flexbox">
            <Div className="flexbox1">
              <Stateball status={data.productStatus} />
              <Div className="mediumFont">{data.productStatus}</Div>
            </Div>
            <Div className="flexbox">
              <HeartSvg
                onClick={favoriteClick}
                favoriteStatus={data.favoriteStatus}
              />
              <Div className="mediumFont">{data.favoriteCount}</Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </STContainer>
  );
};
export default ShareDetailTitle;

const STContainer = styled.div`
  border-bottom: 0.07rem solid ${(props) => props.theme.black};
  margin-top: -0.2rem;
`;

const Div = styled.div`
  .profile {
    display: flex;
    justify-content: space-between;
  }
  .flexboxContainer {
    display: flex;
    justify-content: space-between;
    margin: 0 0 1.7rem 0;
    @media ${(props) => props.theme.mobile} {
      flex-direction: column;
    }
  }
  .middle {
    display: flex;
    align-items: center;
    margin: 0rem 0rem 0rem 1.5rem;
    font-size: 1.75rem;
    font-family: "NotoSansKR-Medium";
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2rem;
      margin: 0rem 0rem 0rem 0.8rem;
    }
  }
  .flexbox {
    display: flex;
    align-items: center;
    @media ${(props) => props.theme.mobile} {
    }
  }
  .flexbox1 {
    display: flex;
    align-items: center;
    margin: 0rem 4rem;
    @media ${(props) => props.theme.mobile} {
      margin: 0 8.3rem;
    }
  }
  .mediumFont {
    font-size: 1.2rem;
    font-family: "NotoSansKR-Medium";
    margin: 0rem 0rem 0rem 0.5rem;
    @media ${(props) => props.theme.mobile} {
      font-size: 0.9rem;
    }
  }
`;

const AvartarWrapper = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  @media ${(props) => props.theme.mobile} {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const Stateball = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.status === "대여가능"
      ? props.theme.stateGreen
      : props.status === "대여중"
      ? props.theme.stateBlue
      : props.theme.stateRed};
  @media ${(props) => props.theme.mobile} {
    width: 1rem;
    height: 1rem;
  }
`;
const HeartSvg = styled(Heart)`
  fill: ${(props) => (props.favoriteStatus ? "#ED4956" : props.theme.gray4)};
  stroke-width: 3rem;
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  @media ${(props) => props.theme.mobile} {
    width: 1.22rem;
    height: 1.22rem;
  }
`;
