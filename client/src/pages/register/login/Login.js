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
      <LoginContainer>
        <h1>ANBD</h1>
        <LoginContent>
          <Form>
            <label>아이디</label>
            <Input
              mb="4.625rem"
              type="text"
              placeholder="아이디를 입력해주세요"
            />
            <label>비밀번호</label>
            <Input
              mb="3.5rem"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <button>로그인</button>
          </Form>
          <Divider>
            <span>소셜 로그인</span>
          </Divider>
          <Social>
            <KakaoButton>
              <LogoImage width="2.1rem" src={logo_kakao}></LogoImage>
            </KakaoButton>
            <GoogleButton>
              <LogoImage width="2rem" src={logo_google}></LogoImage>
            </GoogleButton>
            <NaverButton>
              <LogoImage width="2.7rem" src={logo_naver}></LogoImage>
            </NaverButton>
          </Social>
        </LoginContent>
      </LoginContainer>
    </>
  );
};
export default Login;

const LoginContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    margin: 8.125rem 0 3.4375rem 0;
    font-size: 2.9375rem;
    font-family: "NotoSansKR-Bold";
  }
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.5625rem;
  width: 31.25rem;
  height: 40.625rem;
  margin: 0 auto 8.875rem auto;
  /* box-shadow: 0 0 10px gray; */
`;

const Form = styled.div`
  label {
    font-size: 1.5rem;
    padding: 0 0 0 0.625rem;
  }

  button {
    background-color: ${(props) => props.theme.primary};
    font-size: 1.375rem;
    color: ${(props) => props.theme.white};
    width: 28.125rem;
    height: 3.75rem;
    border-radius: 0.625rem;
    :hover {
      filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
    }
  }
`;

const Input = styled.input`
  width: 28.125rem;
  height: 3.75rem;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border: 0.08rem solid ${(props) => props.theme.gray4};
  border-radius: 0.625rem;
  font-size: 1.25rem;
  padding-left: 1.25rem;
  margin-top: 0.6875rem;
  margin-bottom: ${(props) => props.mb};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${(props) => props.theme.gray4};
  }
  &:focus {
    border: 0.09rem solid;
    border-color: ${(props) => props.theme.primary};
    outline: none;
  }
`;

const Divider = styled.p`
  width: 100%;
  text-align: center;
  border-bottom: 0.1875rem solid ${(props) => props.theme.primary};
  line-height: 0.1rem;
  margin: 4.6875rem 0;

  span {
    font-size: 1rem;
    padding: 0 1.5rem;
    background-color: ${(props) => props.theme.bgColor};
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
  width: ${(props) => props.width};
`;
