import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Left } from "../../../assets/img/icon/caret-left.svg";
import { ReactComponent as Right } from "../../../assets/img/icon/caret-right.svg";


const ShareDetailImg = ({url}) => {
  const value = Object.values(url)
  const TOTAL_SLIDES = value.length -1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const onClickLeftBtn = () =>{
    currentSlide === 0
    ? setCurrentSlide(TOTAL_SLIDES)
    : setCurrentSlide(currentSlide - 1);
  }
  const onClickRightBtn = () =>{
    currentSlide >= TOTAL_SLIDES
    ? setCurrentSlide(0)
    : setCurrentSlide(currentSlide + 1);
  };
  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return(
    <>
  <PictureContainer>
  <Picture ref={slideRef}>
    {value.map((values) =>
    <Img src = {values}></Img>
    )}
    </Picture>
    </PictureContainer> 
    <Btndiv>
    <LeftBtn onClick = {onClickLeftBtn}></LeftBtn>
    <RightBtn onClick = {onClickRightBtn}></RightBtn>
    </Btndiv>
  </>
  )
}
export default ShareDetailImg
const PictureContainer = styled.div`
position: relative;
/* width: 56.25rem; */
width: 100%;
height: 34.3rem;
overflow: hidden;
border-radius: 15px;
`
const Btndiv = styled.div`
display: flex;
justify-content: center;


`
const Picture = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  position: absolute;
`

const LeftBtn = styled(Left)`

width: 2rem;
height:2rem;
fill:  ${(props) => props.theme.textColor};
margin: 1rem 1rem 0rem ;
`
const RightBtn = styled(Right)`
width: 2rem;
height: 2rem;
fill:  ${(props) => props.theme.textColor};
margin: 1rem 1rem 0rem ;
`
const Img = styled.img`
  /* width: 40rem; */
  height: 100%;
  object-fit: cover;
`;

