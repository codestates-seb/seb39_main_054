import React from "react";
import styled from "styled-components";



const Detail2Dropdown = ({openDropDown2})=>{
  
    return (
      
      <Ul display={openDropDown2.display} height={openDropDown2.height} class={openDropDown2.class}>
          <li>{openDropDown2.first}</li>
          <li>{openDropDown2.second}</li>
          <li>{openDropDown2.third}</li>

      </Ul>
      
    );
  
}
export default Detail2Dropdown

const Ul = styled.ul`
  position: absolute;
  display: ${props => props.display};
  flex-direction: column;
  font-size: 1.3125rem;
  font-family: "NotoSansKR-Medium";
  color: ${(props) => props.theme.gray2};
  background-color: ${props=> props.theme.bgColor};
  width: 192px;
  border-radius: 14px;
  overflow: hidden;
  height: ${props => props.height};
  animation-name: ${props => props.class};
  animation-duration: 1s;
  z-index: 100;
  opacity: 0.8;
  text-align: center;
  
  
  li {
    padding: 17.5px 0;
    &:hover {
      color: ${(props) => props.theme.primary};
    }
  }
  @keyframes up {
    0% {
      height: 180px;
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
      height: 180px;
    }
  }
`
