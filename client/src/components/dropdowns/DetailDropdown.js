import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



const DetailDropdown = ({openDropDown})=>{
  
    return (
      
      <Ul display={openDropDown.display} height={openDropDown.height} class={openDropDown.class}>
        <Link to="/share/edit/:id">
          <li>{openDropDown.first}</li>
        </Link>
          <li>{openDropDown.second}</li>
          <li>{openDropDown.third}</li>

      </Ul>
      
    );
  
}
export default DetailDropdown

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
