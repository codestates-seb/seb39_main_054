import React, { useState } from "react";
import styled from "styled-components";
import logo_kakao from "../../../assets/img/sns/kakao_symbol.png";
import logo_google from "../../../assets/img/sns/google_symbol.png";
import logo_naver from "../../../assets/img/sns/naver_symbol.png";
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
          <Divider>
            <span>소셜 로그인</span>
          </Divider>
          <Social>
            <KakaoButton>
              <LogoImage src={logo_kakao}></LogoImage>
            </KakaoButton>
            <GoogleButton>
              <LogoImage src={logo_google}></LogoImage>
            </GoogleButton>
            <NaverButton>
              <LogoImage src={logo_naver}></LogoImage>
            </NaverButton>
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
    margin: 8.125rem 0 3.4375rem 0;
    font-size: 2.9375rem;
    font-weight: bold;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.5625rem;
  width: 31.25rem;
  height: 40.625rem;
  margin: auto;
  box-shadow: 0 0 10px gray;
`;

const Form = styled.div`
  label {
    font-size: 1.5rem;
  }
  input {
    width: 28.125rem;
    height: 3.75rem;
    border: 0.0625rem solid ${(props) => props.theme.gray4};
    border-radius: 0.625rem;
    font-size: 1.25rem;
    padding-left: 1.25rem;
  }

  button {
    background-color: ${(props) => props.theme.primary};
    font-size: 1.375rem;
    color: ${(props) => props.theme.white};
    width: 28.125rem;
    height: 3.75rem;
    border: 0.0625rem solid ${(props) => props.theme.gray4};
    border-radius: 0.625rem;
  }
`;

const Divider = styled.p`
  span {
    font-size: 1rem;
  }
`;

const Social = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const SocialButton = styled.button`
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 50%;
  border: 0.03125rem solid ${(props) => props.theme.gray4};
`;
const KakaoButton = styled(SocialButton)`
  background-color: #ffe600;
  :hover {
    filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
  }
`;
const GoogleButton = styled(SocialButton)`
  background-color: #ffffff;
  :hover {
    filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
  }
`;
const NaverButton = styled(SocialButton)`
  background-color: #09c858;
  :hover {
    filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
  }
`;

const LogoImage = styled.img`
  width: 1.5rem;
`;
