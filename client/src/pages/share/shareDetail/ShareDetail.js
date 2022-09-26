import React, { useState ,useEffect} from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import ShareDetailTitle from "./ShareDetailTitle";
import ShareDetailContent from "./ShareDetailContent";
import { Link , useParams } from "react-router-dom";
import axios from "axios";
import ShareDetailImg from "./ShareDetailImg";
import DetailEditDropdown from "../../../components/dropdowns/DetailEditDropdown";

const ShareDetail = () => {
  const Mobile = useMediaQuery({ maxWidth: 786 })
  const [detail , setDetail] = useState("")
  const [data , setData] = useState("")
  const { id } = useParams();
  const url = data.image


  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/${id}`)
      .then((res) => setData(res.data))

  };
  const getMember = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/member/${id}`)
      .then((res) => setDetail(res.data))

  };


  useEffect(() => {
    getData();
    getMember()
    
  }, []);
  
  return (
    <>
    {!!data && (
        <ShareContainer>
        <Container>
          <Title>{data.title}</Title>
          <DetailEditDropdown/>
          <ShareDetailImg url = {url}></ShareDetailImg>
          <ShareDetailTitle Detail={data} Data = {detail}></ShareDetailTitle>
          <div><hr></hr></div>
          <ContentContainer>
          <ShareDetailContent content = {data}></ShareDetailContent>
          </ContentContainer>
          <Buttondiv><Link to={`/chat/detail/:id`}><ChatBtn>채팅하기</ChatBtn></Link></Buttondiv>
        
        </Container>
        </ShareContainer>
    )}
    </>
  );
};

export default ShareDetail;

const ShareContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  hr{
    margin: 1rem 0rem;
  }
`;
const ContentContainer = styled.div`
width: 100%;
word-break:break-all; 
margin-bottom: 5rem;
display: flex;
flex-direction: column;
`

const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 7.5rem;
width:56.25rem;
width: 40rem;
`
const Title = styled.div`
font-size: 3rem;
`

const ChatBtn = styled.button`
width: 8.125rem;
height: 8.125rem;
border-radius: 50%;
background-color:  ${(props) => props.theme.primary};
font-size: 1.375rem;
color: white;

`
const Buttondiv = styled.div`
text-align: right;
margin: 0rem 0rem 1rem 0rem;

`