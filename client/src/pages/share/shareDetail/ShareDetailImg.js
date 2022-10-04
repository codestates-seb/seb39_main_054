import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Left } from "../../../assets/img/icon/caret-left.svg";
import { ReactComponent as Right } from "../../../assets/img/icon/caret-right.svg";
import Slide from "../../../components/carousel/Slide";

const ShareDetailImg = ({ url }) => {
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
    {!!url && (
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
    )}
    </>
  );
};
export default ShareDetailImg;

const PictureContainer = styled.div`
  position: relative;
  //width: 100%;
  height: 34.3rem;
  overflow: hidden;
`;
const Picture = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Img = styled.img`
  object-fit: contain;
  width: 56.25rem;
  border-radius: 15px;
  //width: 40rem;
  height: 100%;
`;
const Btndiv = styled.div`
  display: flex;
  justify-content: center;
`;
const LeftBtn = styled(Left)`
  width: 2rem;
  height: 2rem;
  fill: ${(props) => props.theme.textColor};
  margin: 1rem 1rem 0rem;
`;
const RightBtn = styled(Right)`
  width: 2rem;
  height: 2rem;
  fill: ${(props) => props.theme.textColor};
  margin: 1rem 1rem 0rem;
`;
