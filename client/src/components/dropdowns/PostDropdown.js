import React from 'react'
import styled from 'styled-components'

const PostDropdown =({openDropDown} , {clickBtn}) => {
  return (
    <>
    <Ul display={openDropDown.display} height={openDropDown.height} className={openDropDown.className}>
      <li onClick={clickBtn}>카테고리</li>

    </Ul>
    </>
  )
}

export default PostDropdown

const Ul = styled.ul`

  position: absolute;
  display: ${props => props.display};
  flex-direction: column;
  font-size: 1.2rem;
  font-family: "NotoSansKR-Medium";
  background-color: ${props=> props.theme.bgColor};
  margin-top: 1rem;
  opacity: 0.8;
  width:12rem;
  border-radius: 10px;
  border:solid 0.1875rem;
  border-color:${(props) => props.theme.gray5} ;
  overflow: hidden;
  height: ${props => props.height};
  animation-name: ${props => props.className};
  animation-duration: 1s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px;
  z-index: 100;

  li {
    padding: 17.5px 0;
    margin-left: 1.5rem;
    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }
  @keyframes up {
    0% {
      height: 250px;
    }
    100% {
      height: 0px;
    }
  }

  @keyframes down {
    0% {
      height: 0px;
    }
    100% {
      height: 250px;
    }
  }
`