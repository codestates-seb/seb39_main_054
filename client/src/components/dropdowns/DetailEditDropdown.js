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

  const navigate = useNavigate();
  const { id } = useParams();
  const productId = data.data.productId;
  const memberId = localStorage.getItem("memberid");
  // console.log(data.data.pimageList.length)
  const url = [];
  for (let i = 0; i < data.data.pimageList.length; i++) {
    url.push(data.data.pimageList[i].imageUrl);
  }

  const stateClick = async (e) => {
    const formData = new FormData();
    formData.append("productPatchDetailDto.memberId", memberId);
    formData.append("productPatchDetailDto.title", data.data.title);
    formData.append("productPatchDetailDto.description", data.data.description);
    formData.append(
      "productPatchDetailDto.pcategoryName",
      data.data.pcategory.pcategoryName
    );
    formData.append("productPatchDetailDto.productStatus", e);
    for (let i = 0; i < url.length; i++) {
      formData.append("imageUrlList", url[i]);
    }
    await axios
      .patch(`${process.env.REACT_APP_API_URL}/v1/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      // .then((res) => console.log(res))
      // .catch((err) => console.log(err));
  };

  const changeMessage = () => {
    alert("상태가 변경되었습니다!");
    window.location.reload();
  };
  const deletePage = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("authorization")}`,
    };
    axios
      .delete(`${process.env.REACT_APP_API_URL}/v1/product/${productId}`, {
        headers: headers,
      })
      .then(() => {
        alert("삭제되었습니다!");
        navigate(`/`);
      });
  };

  const editDrop = () => {
    if (open.class === "up") {
      setOpen({ class: "down" });
    } else {
      setOpen({ class: "up" });
    }
    if (open2.class === "down") {
      setOpen2({ class: "up" });
    }
  };

  const editDrop2 = () => {
    if (open2.class === "up") {
      setOpen2({ class: "down" });
    } else {
      setOpen2({ class: "up" });
    }
  };

  const stateList = ["대여가능", "대여중", "반납완료"];
  return (
    <Editdiv>
      <EditButton>
        <span onClick={editDrop}>...</span>
        <Ul
          display={open.display}
          height={open.height}
          class={open.class}
          style={{ marginLeft: -150 }}
        >
          <Link to={`/share/edit/${id}`}>
            <li onClick={editDrop}>수정하기</li>
          </Link>
          <li onClick={deletePage}>삭제하기</li>
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
  display: flex;
  flex-direction: column;
  font-size: 1.3125rem;
  font-family: "NotoSansKR-Medium";
  color: ${(props) => props.theme.gray2};
  background-color: ${(props) => props.theme.bgColor};
  width: 180px;
  border-radius: 14px;
  overflow: hidden;
  height: ${(props) => (props.class === "up" ? "0px" : "11.2rem")};
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
