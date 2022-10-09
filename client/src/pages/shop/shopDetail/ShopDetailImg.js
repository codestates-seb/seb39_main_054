import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Left } from "../../../assets/img/icon/caret-left.svg";
import { ReactComponent as Right } from "../../../assets/img/icon/caret-right.svg";

const ShopDetailImg = ({ image }) => {
  const TOTAL_SLIDES = image.length - 1;
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
          {image.map((el) => (
            <div>
              <Img src={el.imageUrl}></Img>
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
  height: 34.3rem;
  overflow: hidden;
  border-radius: 15px;
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

const Picture = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Img = styled.img`
  object-fit: cover;
  width: 56.25rem;
  height: 100%;
  border-radius: 15px;

  @media ${(props) => props.theme.tabletL} {
    width: 53.5rem;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 34rem;
  }

  @media ${(props) => props.theme.mobile} {
    width: 23.75rem;
  }
`;

const Btndiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
