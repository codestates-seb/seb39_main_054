import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import slide1 from "../../assets/img/carouselImg/main1.png";
import slide2 from "../../assets/img/carouselImg/main2.png";
import slide3 from "../../assets/img/carouselImg/main3.png";
import { ReactComponent as Left } from "../../assets/img/icon/caret-left.svg";
import { ReactComponent as Right } from "../../assets/img/icon/caret-right.svg";
import { ReactComponent as Pause } from "../../assets/img/icon/pause.svg";
import { ReactComponent as Play } from "../../assets/img/icon/circle-play.svg";
import Slide from "./Slide";

// 전체 슬라이드 수
const TOTAL_SLIDES = 2;

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlay, setIsPlay] = useState(true);
  const slideRef = useRef(null);

  const prevSlideToggle = () => {
    currentSlide === 0
      ? setCurrentSlide(TOTAL_SLIDES)
      : setCurrentSlide(currentSlide - 1);
  };

  const nextSlideToggle = () => {
    currentSlide >= TOTAL_SLIDES
      ? setCurrentSlide(0)
      : setCurrentSlide(currentSlide + 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  }, [currentSlide]);

  useEffect(() => {
    let timer;
    // 재생중 3초 간격으로 슬라이드 변화
    if (isPlay) {
      timer = setTimeout(() => {
        if (currentSlide >= TOTAL_SLIDES) {
          setCurrentSlide(0);
        } else {
          setCurrentSlide(currentSlide + 1);
        }
      }, 3000);
    }
    // 일시정지 버튼을 누를 경우 타이머를 제거하여 해당 이미지에 정지.
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <CarouselContainer>
      <Content ref={slideRef}>
        <div>
          <Slide img={slide1} />
        </div>
        <div>
          <Slide img={slide2} />
        </div>
        <div>
          <Slide img={slide3} />
        </div>
      </Content>
      <ButtonContainer>
        <Left onClick={prevSlideToggle} />
        {isPlay ? (
          <Pause onClick={() => setIsPlay(!isPlay)} />
        ) : (
          <Play onClick={() => setIsPlay(!isPlay)} />
        )}
        <Right onClick={nextSlideToggle} />
      </ButtonContainer>
    </CarouselContainer>
  );
};

export default Carousel;

const CarouselContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 500px;
  overflow: hidden;
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  bottom: 1rem;

  svg {
    margin: 0 1rem;
    width: 2rem;
    height: 2rem;
    fill: ${(props) => props.theme.white};

    &:hover {
      fill: ${(props) => props.theme.primary};
    }
  }
`;
