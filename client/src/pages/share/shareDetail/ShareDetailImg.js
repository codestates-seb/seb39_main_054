import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Left } from "../../../assets/img/icon/caret-left.svg";
import { ReactComponent as Right } from "../../../assets/img/icon/caret-right.svg";

const ShareDetailImg = ({ image }) => {
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
      {!!image && (
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
      )}
    </>
  );
};
export default ShareDetailImg;

const PictureContainer = styled.div`
  position: relative;
  height: 34.3rem;
  overflow: hidden;
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
  object-fit: contain;
  /* object-fit: cover; */
  width: 52rem;
  border-radius: 15px;
  height: 100%;

  @media ${(props) => props.theme.tabletL} {
    width: 53.5rem;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 34rem;
  }

  @media ${(props) => props.theme.mobile} {
    object-fit: contain;
    width: 23.75rem;
  }
`;
const Btndiv = styled.div`
  display: flex;
  justify-content: center;
`;
const LeftBtn = styled(Left)`
  width: 1.4rem;
  height: 1.4rem;
  fill: ${(props) => props.theme.textColor};
  margin: 1rem 1rem 0rem;
  margin-top: 0.8rem;
  cursor: pointer;
`;
const RightBtn = styled(Right)`
  width: 1.4rem;
  height: 1.4rem;
  fill: ${(props) => props.theme.textColor};
  margin: 1rem 1rem 0rem;
  margin-top: 0.8rem;
  cursor: pointer;
`;
