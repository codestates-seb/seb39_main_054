import React, { useState } from "react";
import styled from "styled-components";
import example from "../../../assets/img/item/sample.png"
import { useMediaQuery } from "react-responsive";
import ShareDetailTitle from "./ShareDetailTitle";
import ShareDetailContent from "./ShareDetailContent";



const ShareDetail = () => {
  const Mobile = useMediaQuery({ maxWidth: 786 })
  const [Detail , setDetail] = useState({name : "공유자" , statename : "대여가능" , heart : "13"})
  const [Content , setContent] = useState({date : "2022.09.16" , content : "작년에 샀어요 너무 좋아요작년에 샀어요 너무 좋아요 작년에 샀어요 너무 좋아요ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ" })
  const name = "채팅하기"
  return (
    <>
      <ShareContainer>
        <Container>
          <Title>캠핑 장비 공유합니다.</Title>
          <Editdiv><EditButton>...</EditButton></Editdiv>
          <Picture><img src={example}></img></Picture>
          <ShareDetailTitle Detail={Detail}></ShareDetailTitle>
          <div><hr></hr></div>
          <ShareDetailContent content = {Content}></ShareDetailContent> 
          <Buttondiv><ChatBtn>채팅하기</ChatBtn></Buttondiv>
        </Container>
      </ShareContainer>
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
const Container = styled.div`
display: flex;
flex-direction: column;
margin: 7.5rem 10rem 0rem 10rem;
width:56.25rem;
`
const Title = styled.div`
font-size: 3rem;
`
const Picture = styled.div`
width: 56.25rem;
height: 34.375rem;

`
const EditButton = styled.button`
border: none;
background-color: ${(props) => props.theme.bgColor};
color: ${(props) => props.theme.textColor};
font-size: 1.875rem;
text-align: right;
`
const Editdiv = styled.div`
text-align: right;
margin: -1rem 0rem 1.875rem 0rem;
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