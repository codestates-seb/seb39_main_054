import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";

const SignUp = () => {
 

  return (
    <>
      <LoginContainer>
        <h1>회원가입</h1>
        <LoginContent>
          <Form>
            <label>아이디</label>
            <Input
              name="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              mb="3.125rem"
            />
            <label>비밀번호</label>
            <Input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              mb="3.125rem"
            />
            <label>비밀번호 확인</label>
            <Input
              name="password_confirm"
              type="password"
              placeholder="비밀번호를 다시 한번 입력해주세요"
              mb="3.125rem"
            />
            <label>닉네임</label>
            <Input
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요"
              mb="2rem"
            />
            <button type="submit">로그인</button>
          </Form>
        </LoginContent>
      </LoginContainer>
    </>
  );
};
export default SignUp;

const LoginContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    margin: 8.125rem 0 1.3125rem 0;
    font-size: 2.5rem;
    font-family: "NotoSansKR-Medium";
  }
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.5625rem;
  width: 31.25rem;
  height: 42.5rem;
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
