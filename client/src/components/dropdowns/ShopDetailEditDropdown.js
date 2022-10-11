import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ShopDetailEditDropdown = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const roles = localStorage.getItem("roles");
  const [open, setOpen] = useState({
    class: "up",
  });

  const editDrop = () => {
    if (open.class === "up") {
      setOpen({ class: "down" });
    } else {
      setOpen({ class: "up" });
    }
  };

  const deleteHandelr = async () => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/v1/store/${id}`);
    navigate("/shop/list");
  };
  return (
    <Editdiv>
      <EditButton>
        {roles === "ROLE_ADMIN" && (
          <span onClick={editDrop}>...</span>
        )}
        <Ul display={open.display} height={open.height} class={open.class}>
          <Link to={`/shop/edit/${id}`}>
            <li onClick={editDrop}>수정하기</li>
          </Link>
          <li
            onClick={() => {
              editDrop();
              deleteHandelr();
            }}
          >
            삭제하기
          </li>
        </Ul>
      </EditButton>
    </Editdiv>
  );
};
export default ShopDetailEditDropdown;

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
  display: flex;
  flex-direction: column;
  font-size: 1.3125rem;
  font-family: "NotoSansKR-Medium";
  color: ${(props) => props.theme.gray2};
  background-color: ${(props) => props.theme.bgColor};
  width: 192px;
  height: ${(props) => (props.class === "up" ? "0px" : "7.5rem")};
  border-radius: 14px;
  overflow: hidden;
  transition: height 1.3s;
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
`;
