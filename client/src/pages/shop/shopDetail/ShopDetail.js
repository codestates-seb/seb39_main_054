import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import DetailDropdown from "../../../components/dropdowns/DetailDropdown";
import ShopDetailImg from "./ShopDetailImg";
import ShopDetailTitle from "./ShopDetailTitle";
import ShopMap from "./ShopMap";

const ShopDetail = () => {
  const [data, setData] = useState("");
  const [user, setUser] = useState("");
  const { id } = useParams();
  const url = data.image;

  const [openDropDown, setOpenDropDown] = useState({
    class: "up",
    height: "0px",
    display: "none",
    first: "수정하기",
    second: "삭제하기",
  });

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/shop/${id}`)
      .then((res) => setData(res.data));
  };

  const getMember = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/member/${id}`)
      .then((res) => setUser(res.data));
  };

  const editDrop = () => {
    if (openDropDown.class === "up") {
      setOpenDropDown({
        class: "down",
        display: "flex",
        first: "수정하기",
        second: "삭제하기",
      });
    } else {
      setOpenDropDown({
        class: "up",
        display: "none",
        first: "수정하기",
        second: "삭제하기",
      });
    }
  };

  useEffect(() => {
    getData();
    getMember();
  }, []);

  return (
    <>
      {!!data && (
        <ShopContainer>
          <Container>
            <Editdiv>
              <EditButton onClick={editDrop}>
                ...
                <DetailDropdown openDropDown={openDropDown}></DetailDropdown>
              </EditButton>
            </Editdiv>
            <Imagediv>
              <ShopDetailImg url={url}></ShopDetailImg>
            </Imagediv>
            <Title>
              <ShopDetailTitle data={data} user={user}></ShopDetailTitle>
            </Title>
            <div>
              <hr></hr>
            </div>
            <Buttondiv>
              <Link to={`/chat/user/:id`}>
                <ChatBtn>채팅하기</ChatBtn>
              </Link>
            </Buttondiv>
            <ShopMap></ShopMap>
          </Container>
        </ShopContainer>
      )}
    </>
  );
};

export default ShopDetail;

const ShopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  hr {
    margin: 1rem 0rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4.0625rem 0;
  width: 56.25rem;
`;

const Title = styled.div`
  font-size: 1.875rem;
  margin: 1.875rem 0;
`;

const Imagediv = styled.div`
  height: 34.375rem;
  width: 50.626rem;
`;

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

const ChatBtn = styled.button`
  width: 8.125rem;
  height: 8.125rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary};
  font-size: 1.375rem;
  color: white;
`;

const Buttondiv = styled.div`
  text-align: right;
  margin: 0rem 0rem 1rem 0rem;
`;

// const MapDiv = styled.div`
//   /* width: 300px;
//   height: 300px; */
// `
