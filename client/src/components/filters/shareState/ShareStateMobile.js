import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { shareStatusSelect } from "../../../redux/actions/filtersAction";
import { ReactComponent as Check } from "../../../assets/img/icon/category/check.svg";

const ShareStateMobile = () => {
  const [current, setCurrent] = useState("전체");
  const dispatch = useDispatch();

  const checkToggle = (el) => {
    setCurrent(el);
    dispatch(shareStatusSelect(el));
  };

  return (
    <Container>
      <Content>
        <div className="share-state-check all">
          <Check display={`${current === "전체" ? "block" : "none"}`} />
          <span onClick={(el) => checkToggle(el.target.textContent)}>전체</span>
        </div>
        <div className="share-state-check possible">
          <Check display={`${current === "대여가능" ? "block" : "none"}`} />
          <span onClick={(el) => checkToggle(el.target.textContent)}>
            대여가능
          </span>
        </div>
        <div className="share-state-check rented">
          <Check display={`${current === "대여중" ? "block" : "none"}`} />
          <span onClick={(el) => checkToggle(el.target.textContent)}>
            대여중
          </span>
        </div>
        <div className="share-state-check return">
          <Check display={`${current === "반납완료" ? "block" : "none"}`} />
          <span onClick={(el) => checkToggle(el.target.textContent)}>
            반납완료
          </span>
        </div>
      </Content>
    </Container>
  );
};

export default ShareStateMobile;

const Container = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 66.5rem;
  margin-bottom: 1rem;

  @media ${(props) => props.theme.tabletL} {
    width: 48.5rem;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 46.5rem;
    justify-content: center;
  }

  @media ${(props) => props.theme.mobile} {
    justify-content: center;
    width: 23.75rem;
    margin-bottom: 0.2rem;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.8125rem;
  height: 2rem;
  border-radius: 30px;
  font-size: 0.79rem;
  font-family: "NotoSansKR-Medium";
  padding-left: 0.6rem;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.primary};

  .share-state-check {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-right: 1.3rem;
    cursor: pointer;

    &.all {
      width: 54.88px;
    }

    &.possible {
      width: 82.56px;
    }

    &.rented {
      width: 68.72px;
    }

    &.return {
      width: 82.56px;
    }
  }

  svg {
    display: ${(props) => props.display};
    width: 0.8rem;
    height: 0.8rem;
    fill: ${(props) => props.theme.white};
    margin-right: 0.3rem;
  }
`;
