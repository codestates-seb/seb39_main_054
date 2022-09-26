import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Left } from "../../../assets/img/icon/caret-left.svg";
import { ReactComponent as Right } from "../../../assets/img/icon/caret-right.svg";

const ShopDetailImg = ({ url }) => {
  const value = Object.values(url);
  const TOTAL_SLIDES = value.length - 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const onClickLeftBtn = () => {
    currentSlide === 0
      ? setCurrentSlide(TOTAL_SLIDES)
      : setCurrentSlide(currentSlide - 1);
  };

  const onClickRightBtn = () => {
    currentSlide >= TOTAL_SLIDES
      ? setCurrentSlide(0)
      : setCurrentSlide(currentSlide + 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  return (
    <>
      <PictureContainer>
        <Picture ref={slideRef}>
          {value.map((values) => (
            <div>
              <Img src={values}></Img>
            </div>
          ))}
        </Picture>
      </PictureContainer>

      <Btndiv>
        <LeftBtn onClick={onClickLeftBtn}></LeftBtn>
        <RightBtn onClick={onClickRightBtn}></RightBtn>
      </Btndiv>
    </>
  );
};

export default ShopDetailImg;

const PictureContainer = styled.div`
position: relative;
width: 56.25rem;
height: 550px;
overflow: hidden;
border-radius: 14px;
`
const Btndiv = styled.div`
display: flex;
position: relative;
width: 65rem;
margin: -18rem 0rem 0rem -4.5rem;
justify-content: space-between;

`
const Picture = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`
const LeftBtn = styled(Left)`

width: 2rem;
height:2rem;
fill:  ${(props) => props.theme.textColor};
position: relative;
`
const RightBtn = styled(Right)`
width: 2rem;
height: 2rem;
fill:  ${(props) => props.theme.textColor};
position: relative;

`
const Img = styled.img`
  object-fit: cover;
  width: 56.25rem;
`;