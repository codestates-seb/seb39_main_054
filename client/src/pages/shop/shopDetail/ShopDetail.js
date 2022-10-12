import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ShopDetailEditDropdown from "../../../components/dropdowns/ShopDetailEditDropdown";
import DataLoading from "../../../components/loading/DataLoading";
import ShopDetailImg from "./ShopDetailImg";
import ShopDetailTitle from "./ShopDetailTitle";
import ShopMap from "./ShopMap";

const ShopDetail = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/store/${id}`)
      .then((res) => {
        setData(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setLoading(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <DataLoading></DataLoading>
      ) : (
        !!data && (
          <ShopContainer>
            <Container>
              <Editdiv>
                <EditButton>
                  <ShopDetailEditDropdown></ShopDetailEditDropdown>
                </EditButton>
              </Editdiv>
              <Imagediv>
                <ShopDetailImg image={data.simageList}></ShopDetailImg>
              </Imagediv>
              <Title>
                <ShopDetailTitle data={data}></ShopDetailTitle>
              </Title>
              <div>
                <hr></hr>
              </div>
              <ContentDiv>
                <CreatedPost>{data.creationDate.slice(0, 10)}</CreatedPost>
                <Content>{data.description}</Content>
              </ContentDiv>
              <MapDiv>
                <ShopMap data={data}></ShopMap>
              </MapDiv>
            </Container>
          </ShopContainer>
        )
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
  @media ${(props) => props.theme.tabletL} {
    width: 53.5rem;
    margin: 2.0625rem 0;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 34rem;
    margin: 2.0625rem 0;
  }

  @media ${(props) => props.theme.mobile} {
    width: 23.75rem;
  }
`;

const Title = styled.div`
  font-size: 1.875rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const Imagediv = styled.div`
  display: flex;
  flex-direction: column;
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

  @media ${(props) => props.theme.tabletS} {
    font-size: 16px;
  }
`;
const Content = styled.pre`
  white-space: pre-wrap;
  word-break: break-all;
  overflow: auto;

  @media ${(props) => props.theme.tabletS} {
    font-size: 15px;
  }
`;

const MapDiv = styled.div`
  margin-top: 10rem;
  margin-bottom: 2.5rem;
  border-radius: 14px;
  width: 56.25rem;
  height: 34.3rem;
  @media ${(props) => props.theme.tabletL} {
    width: 53.5rem;
    height: 32.3rem;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 34rem;
    height: 22.3rem;
  }

  @media ${(props) => props.theme.mobile} {
    width: 23.75rem;
    height: 15rem;
  }
`;
