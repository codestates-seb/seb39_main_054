import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "../fonts/fonts.css";

const GlobalStyle = createGlobalStyle`
  ${reset}

  *{
    box-sizing: border-box;
  }

  :root{
  }

  body{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: "NotoSansKR-Regular";
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }

  a{
    text-decoration: none;
    &:link,&:visited{
      color: inherit;
    }
  }
  
  button{
    cursor: pointer;
    border: none;
    padding: 0;
  }
  
`;

export default GlobalStyle;
