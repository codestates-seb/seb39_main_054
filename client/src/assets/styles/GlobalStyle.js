import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  *{
    box-sizing: border-box;
  }

  body{
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  a{
    text-decoration: none;
    &:link,&:visited{
      color: inherit;
    }
  }
  
  button{
    cursor: pointer;
  }
  
`;

export default GlobalStyle;
