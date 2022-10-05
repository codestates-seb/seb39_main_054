import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DetailEditDropdown = (data) => {
  const [open, setOpen] = useState({
    class: "up",
    height: "0px",
    display: "none",
  });

  const [open2, setOpen2] = useState({
    class: "up",
    height: "0px",
    display: "none",
  });

  const { id } = useParams();

  const stateClick = async (e) => {
    const formData = new FormData();
    formData.append("productStatus", e);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/v1/product/${id}`, formData ,{
        headers: { "Content-Type": "application/json" },
      }
     )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const changeMessage = () => {
    alert("변경되었습니다!");
    window.location.reload();
  };

  const editDrop = () => {
    if (open.class === "up") {
      setOpen({ class: "down", height: "12rem", display: "flex" });
    } else {
      setOpen({ class: "up", height: "0px", display: "none" });
    }
    if (open2.class === "down") {
      setOpen2({ class: "up", height: "0px", display: "none" });
    }
  };

  const editDrop2 = () => {
    if (open2.class === "up") {
      setOpen2({ class: "down", height: "12rem", display: "flex" });
    } else {
      setOpen2({ class: "up", height: "0px", display: "none" });
    }
  };

  const stateList = ["대여가능", "대여중", "반납완료"];
  return (
    <Editdiv>
      <EditButton>
        <span onClick={editDrop}>...</span>
        <Ul display={open.display} height={open.height} class={open.class}
        style={{ marginLeft: -150}}>
          <Link
            to={`/share/edit/${id}`}
            state={{
              data: data,
            }}
          >
            <li onClick={{ editDrop }}>수정하기</li>
          </Link>
          <li onClick={editDrop}>삭제하기</li>
          <li onClick={editDrop2}>공유상태 변경</li>
        </Ul>
        <Ul
          onClick={editDrop2}
          display={open2.display}
          height={open2.height}
          class={open2.class}
          style={{ marginLeft: -330, marginTop: 150 }}
        >
          {stateList.map((el, idx) => (
            <li
              onClick={() => {
                stateClick(stateList[idx]);
                changeMessage();
              }}
            >
              {el}
            </li>
          ))}
        </Ul>
      </EditButton>
    </Editdiv>
  );
};
export default DetailEditDropdown;

const EditButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 1.875rem;
`;
const Editdiv = styled.div`
  color: ${(props) => props.theme.textColor};
  font-size: 1.875rem;
  margin: 0rem 0rem 1rem 0rem;
  text-align: right;
`;
const Ul = styled.ul`
  position: absolute;
  display: ${(props) => props.display};
  flex-direction: column;
  font-size: 1.3125rem;
  font-family: "NotoSansKR-Medium";
  color: ${(props) => props.theme.gray2};
  background-color: ${(props) => props.theme.bgColor};
  width: 192px;
  border-radius: 14px;
  overflow: hidden;
  height: ${(props) => props.height};
  animation-name: ${(props) => props.class};
  animation-duration: 1s;
  z-index: 100;
  opacity: 0.8;
  text-align: center;
  margin: 1rem 0rem 0rem -1rem;

  li {
    padding: 17.5px 0;
    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }

  @keyframes up {
    0% {
      height: 12rem;
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
      height: 12rem;
    }
  }
`;
