import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { categorySelect } from "../../../redux/actions/filtersAction";
import { ReactComponent as Category0 } from "../../../assets/img/icon/category/all.svg";
import { ReactComponent as Category1 } from "../../../assets/img/icon/category/camp.svg";
import { ReactComponent as Category2 } from "../../../assets/img/icon/category/fish.svg";
import { ReactComponent as Category3 } from "../../../assets/img/icon/category/mount.svg";
import { ReactComponent as Category4 } from "../../../assets/img/icon/category/sports.svg";
import { ReactComponent as Category5 } from "../../../assets/img/icon/category/layer-group.svg";

const Category = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(0);
  const category = ["전체", "캠핑", "낚시", "등산", "스포츠", "기타"];
  const categoryIcon = [
    <Category0 />,
    <Category1 />,
    <Category2 />,
    <Category3 />,
    <Category4 />,
    <Category5 />,
  ];

  const iconToggle = (idx) => {
    setCurrent(idx);
    dispatch(categorySelect(category[idx]));
  };

  return (
    <Container>
      {category.map((el, idx) => (
        <div
          className={idx !== current ? "category" : "category on"}
          key={idx}
          onClick={() => iconToggle(idx)}
        >
          {categoryIcon[idx]}
          <span>{el}</span>
        </div>
      ))}
    </Container>
  );
};

export default Category;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55.3125rem;
  height: 8.125rem;
  margin: 2rem 0;

  svg {
    width: 60px;
    height: 60px;
    margin: 0.5rem 0;
    stroke: ${(props) => props.theme.gray};
    &:hover {
      fill: ${(props) => props.theme.primary};
    }
  }

  .category {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 2.625rem;
    cursor: pointer;
  }

  .category.on {
    svg {
      fill: ${(props) => props.theme.primary};
    }
  }

  span {
    font-size: 18px;
    font-family: "NotoSansKR-Medium";
    margin: 0.5rem 0;
  }
`;
