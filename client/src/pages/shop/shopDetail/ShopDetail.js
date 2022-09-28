import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DetailEditDropdown from "../../../components/dropdowns/DetailEditDropdown";
import ShopDetailImg from "./ShopDetailImg";
import ShopDetailTitle from "./ShopDetailTitle";
import ShopMap from "./ShopMap";

const ShopDetail = () => {
  const [data, setData] = useState("");
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
  }, []);

  return (
    <>
      {!!data && (
        <ShopContainer>
          <Container>
            <Editdiv>
              <EditButton onClick={editDrop}>
                <DetailEditDropdown
                  openDropDown={openDropDown}
                ></DetailEditDropdown>
              </EditButton>
            </Editdiv>
            <Imagediv>
              <ShopDetailImg url={url}></ShopDetailImg>
            </Imagediv>
            <Title>
              <ShopDetailTitle data={data}></ShopDetailTitle>
            </Title>
            <div>
              <hr></hr>
            </div>
            <ContentDiv>
              <CreatedPost>2022.09.16</CreatedPost>
              <Content>{data.description}</Content>
            </ContentDiv>
            <MapDiv>
              <ShopMap data={data}></ShopMap>
            </MapDiv>
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
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Imagediv = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 34.375rem; */
  /* width: 56.25rem; */
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

const ContentDiv = styled.div`
  font-size: 20px;
  line-height: 2rem;
`;

const CreatedPost = styled.div`
  display: flex;
  justify-content: right;
`;
const Content = styled.pre``;

const MapDiv = styled.div`
  margin-top: 10rem;
  margin-bottom: 2.5rem;
  border-radius: 14px;
`;
