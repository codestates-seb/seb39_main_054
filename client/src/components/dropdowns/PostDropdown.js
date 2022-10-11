import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ReactComponent as Down } from "../../assets/img/icon/caret-down.svg";
import { ReactComponent as Up } from "../../assets/img/icon/caret-up.svg";

const PostDropdown = ({ categoryChange, pcategory }) => {
  const category = ["캠핑", "낚시", "등산", "스포츠", "기타"];
  const [choice, setChoice] = useState("카테고리");
  const [open, setOpen] = useState({
    className: "up",
    height: "0px",
    display: "none",
  });

  const clickCategoty = () => {
    if (open.className === "up") {
      setOpen({ className: "down", height: "280px", display: "flex" });
    } else {
      setOpen({ className: "up", height: "0px", display: "none" });
    }
  };
  const menuClick = () => {
    categoryChange(choice);
  };
  useEffect(() => {
    setChoice(choice)
    menuClick();
  }, [choice]);

  useEffect(() => {
    if (pcategory) {
      setChoice(pcategory);
    }
  }, []);

  return (
    <>
      <div>
        <TagBtn onClick={clickCategoty}>
          {" "}
          {choice}
          {open.className === "up" ? <DownBtn /> : <UpBtn />}
        </TagBtn>
        <Ul
          display={open.display}
          height={open.height}
          className={open.className}
        >
          {category.map((el,idx) => (
            <li key={idx}
              onClick={() => {
                menuClick();
                setChoice(el);
                setOpen({ className: "up", height: "0px", display: "none" });
              }}
            >
              {el}
            </li>
          ))}
        </Ul>
      </div>
    </>
  );
};
export default PostDropdown;

const Ul = styled.ul`
  position: absolute;
  display: ${(props) => props.display};
  flex-direction: column;
  font-size: 1.2rem;
  font-family: "NotoSansKR-Medium";
  background-color: ${(props) => props.theme.bgColor};
  margin-top: 1rem;
  opacity: 0.8;
  width: 12rem;
  border-radius: 10px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  overflow: hidden;
  height: ${(props) => props.height};
  animation-name: ${(props) => props.className};
  animation-duration: 1s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px;
  z-index: 100;
  text-align: center;

  @media ${(props) => props.theme.tabletL} {
    width: 39.4rem
  }

  @media ${(props) => props.theme.tabletS} {
    width: 29.4rem
  }
  @media ${(props) => props.theme.mobile} {
    width: 21rem
  }


  li {
    padding: 17.5px 0;

    &:hover {
      color: ${(props) => props.theme.primary};
    }
    cursor: pointer;
  }

  @keyframes up {
    0% {
      height: 280px;
    }
    100% {
      height: 0px;
    }
  }

  @keyframes down {
    0% {
      height: 0px;
    }
    100% {
      height: 280px;
    }
  }
`;

const DownBtn = styled(Down)`
  width: 1rem;
  height: 1rem;
  fill: ${(props) => props.theme.primary};
  margin: 0rem -2rem 0rem 1em;
`;

const UpBtn = styled(Up)`
  width: 1rem;
  height: 1rem;
  fill: ${(props) => props.theme.primary};
  margin: 0rem -2rem 0rem 1em;
`;

const TagBtn = styled.button`
  width: 12rem;
  height: 3.44rem;
  @media ${(props) => props.theme.mobile} {
    height: 2.5rem;
    width: 100%;
  }
  @media ${(props) => props.theme.tabletL} {
    width: 100%;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 100%;
  }
  background-color: ${(props) => props.theme.bgColor};
  font-size: 1.2rem;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  border-radius: 10px;
  margin: 0rem;
  color: ${(props) => props.theme.textColor};
  @media ${(props) => props.theme.tabletL} {
    margin-top: 1rem;
  }
`;
