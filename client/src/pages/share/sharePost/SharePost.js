import styled from "styled-components";
import { ReactComponent as Down } from "../../../assets/img/icon/caret-down.svg";
import { ReactComponent as Up } from "../../../assets/img/icon/caret-up.svg";
import { useState , useEffect } from "react";


const SharePost = () =>{

  const [updown, setUpdown] = useState({
    className : "up",
    height : "0px",
    display : "none"

  });
  const [categoty , setCategory] = useState("카테고리")
  const ClickDrop = ({list}) =>{
    setCategory(list)

  }
  const ClickBtn = ()=>{
    if(updown.className === "up"){
      setUpdown({className : "down", height : "250px" , display : "flex"})
    }else{
      setUpdown({className : "up", height : "0px" , display : "none"})
    }
  }
  return(
    
    <MainContainer>
      <Title>공유 물품 작성</Title>
      <WriteContainer>
        <TextDiv>
          <SubTitle>제목</SubTitle>
          <PageContainer>
          <InputText type="text" placeholder="제목을 입력해주세요"></InputText>
          <TagBtn onClick={ClickBtn}>카테고리 
          {updown.className === "up" ?(<DownBtn />) : (<UpBtn />)}</TagBtn>
          </PageContainer>
          <FlexContainer>
          <SubTitle>이미지 첨부</SubTitle>
          </FlexContainer>
          <SubTitle>내용</SubTitle>
          <ContentText placeholder="내용을 입력해주세요" ></ContentText>
          <BtnDiv>
          <CancelBtn>취소</CancelBtn>
          <PostBtn>등록</PostBtn>
          </BtnDiv>
        </TextDiv>
      </WriteContainer>
    </MainContainer>
    
  )

}
export default SharePost;


const DownBtn = styled(Down)`
  width : 1rem;
  height: 1rem;
  fill : ${(props) => props.theme.primary};
  margin: 0rem -2rem 0rem 1em;
`
const UpBtn = styled(Up)`
 width : 1rem;
  height: 1rem;
  fill : ${(props) => props.theme.primary};
  margin: 0rem -2rem 0rem 1em;
`

const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items : center;


  `
const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const FlexContainer = styled.div`
  display: flex;
`
const Title = styled.div`
font-size: 2.5rem;
text-align: center;
margin: 5rem;
`
const WriteContainer = styled.div`
width: 66.25rem;
display: flex;
background-color: ${(props) => props.theme.gray6};
flex-direction: column;
/* margin: 0rem 26.875rem 5rem; */
border-radius: 15px;
`
const SubTitle = styled.div`
font-size: 1.375rem;
margin: 1rem;
`
const TextDiv = styled.div`
margin: 5.3125rem;
`
const InputText = styled.input`
width: 32.5rem;
height: 3.44rem;
font-size: 1.2rem;
background-color:  ${(props) => props.theme.bgColor};
border-radius: 10px;
border:solid 0.1875rem;
border-color:${(props) => props.theme.gray5} ;

`
const ContentText = styled.textarea`
height: 55.625rem;
width: 100%;
font-size: 1.2rem;
background-color:  ${(props) => props.theme.bgColor};
border-radius: 10px;
border:solid 0.1875rem;
border-color:${(props) => props.theme.gray5};
vertical-align: top;
resize: none;

`
const TagBtn = styled.button`
width:12rem;
height: 3.44rem;;
background-color:  ${(props) => props.theme.bgColor};
font-size: 1.2rem;
border:solid 0.1875rem;
border-color:${(props) => props.theme.gray5} ;
border-radius: 10px;
margin: 0rem;
`
const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0rem 0rem -3rem 0rem;
  font-size: 1.375rem;
`
const CancelBtn = styled.button`
  width: 8.44rem;
  height: 3.125rem;
  background-color:${(props) => props.theme.gray3};
  color: white;
  margin: 2.5rem 2rem;
  font-size: 1.375rem;
  
`
const PostBtn = styled.button`
  width: 8.44rem;
  height: 3.125rem;
  background-color:${(props) => props.theme.primary};
  color:White;
  margin: 2.5rem 2rem;
  font-size: 1.375rem;
`

