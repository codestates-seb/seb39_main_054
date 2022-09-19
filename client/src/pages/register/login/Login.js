import React, { useState } from "react";
import styled from "styled-components";
// import { Link } from "react-router-dom";

const Login = () => {
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")

  return (
    <>
      <LoginBox>
        <h1>ANBD</h1>
        <Container>
          <Form>
            <label>아이디</label>
            <input type="email" placeholder="아이디를 입력해주세요"></input>
            <label>비밀번호</label>
            <input type="email" placeholder="비밀번호를 입력해주세요"></input>
            <button>로그인</button>
          </Form>
          <p className="divider">
            <span>소셜 로그인</span>
          </p>
          <Social>
            <GoogleButton>
              <LogoImage
                src={process.env.PUBLIC_URL + "/img/icon/sns/kakao_symbol.png"}
              ></LogoImage>
              Log in with Google
            </GoogleButton>
            <GitHubButton>
              <LogoImage
                src={process.env.PUBLIC_URL + "/img/icon/sns/kakao_symbol.png"}
              ></LogoImage>
              Log in with GitHub
            </GitHubButton>
            <FacebookButton>
              <LogoImage
                src={process.env.PUBLIC_URL + "/img/icon/sns/kakao_symbol.png"}
              ></LogoImage>
              Log in with Facebook
            </FacebookButton>
          </Social>
        </Container>
      </LoginBox>
    </>
  );
};
export default Login;

const LoginBox = styled.div`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* font-size: 0.8rem; */
  transition: all 0.5s;

  h1 {
    text-align: center;
    margin: -6rem 0 2rem;
    font-size: 2rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  width: 300px;
  margin: auto;
  box-shadow: 0 0 10px gray;
`;

const Form = styled.div``;
const Social = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SocialButton = styled.button`
  width: 100%;
  height: 37.8px;
  padding: 10.4px;
  margin: 4px 0px;
  border-radius: 5px;
  border: solid rgb(186, 191, 196);
  border-width: 1px;
  padding: 0.8em;
`;
export const GoogleButton = styled(SocialButton)`
  background-color: white;
  :hover {
    background-color: rgb(248, 249, 249);
  }
`;
export const GitHubButton = styled(SocialButton)`
  background-color: rgb(47, 52, 55);
  :hover {
    background-color: rgb(35, 39, 41);
  }
  color: white;
  font-weight: bolder;
`;
export const FacebookButton = styled(SocialButton)`
  background-color: rgb(56, 84, 153);
  :hover {
    background-color: rgb(54, 60, 121);
  }
  color: white;
  font-weight: bolder;
`;

const LogoImage = styled.img`
  margin: -3.9px 5px;
  height: 18px;
  width: 18px;
`;
