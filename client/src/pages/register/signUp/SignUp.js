// import React, { useState } from "react";
// import styled from "styled-components";
// import { useForm } from "react-hook-form";
// // import { Link } from "react-router-dom";

// const SignUp = () => {

//   return (
//     <>
//       <LoginContainer>
//         <h1>회원가입</h1>
//         <LoginContent>
//           <Form>
//             <label>아이디</label>
//             <Input
//               name="id"
//               type="text"
//               placeholder="아이디를 입력해주세요"
//               mb="3.125rem"
//             />
//             <label>비밀번호</label>
//             <Input
//               name="password"
//               type="password"
//               placeholder="비밀번호를 입력해주세요"
//               mb="3.125rem"
//             />
//             <label>비밀번호 확인</label>
//             <Input
//               name="password_confirm"
//               type="password"
//               placeholder="비밀번호를 다시 한번 입력해주세요"
//               mb="3.125rem"
//             />
//             <label>닉네임</label>
//             <Input
//               name="nickname"
//               type="text"
//               placeholder="닉네임을 입력해주세요"
//               mb="2rem"
//             />
//             <button type="submit">로그인</button>
//           </Form>
//         </LoginContent>
//       </LoginContainer>
//     </>
//   );
// };
// export default SignUp;

// const LoginContainer = styled.div`
//   background-color: ${(props) => props.theme.bgColor};
//   color: ${(props) => props.theme.textColor};
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   h1 {
//     text-align: center;
//     margin: 8.125rem 0 1.3125rem 0;
//     font-size: 2.5rem;
//     font-family: "NotoSansKR-Medium";
//   }
// `;

// const LoginContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 0 1.5625rem;
//   width: 31.25rem;
//   height: 42.5rem;
//   margin: 0 auto 8.875rem auto;
//   /* box-shadow: 0 0 10px gray; */
// `;

// const Form = styled.div`
//   label {
//     font-size: 1.5rem;
//     padding: 0 0 0 0.625rem;
//   }

//   button {
//     background-color: ${(props) => props.theme.primary};
//     font-size: 1.375rem;
//     color: ${(props) => props.theme.white};
//     width: 28.125rem;
//     height: 3.75rem;
//     border-radius: 0.625rem;
//     :hover {
//       filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
//     }
//   }
// `;

// const Input = styled.input`
//   width: 28.125rem;
//   height: 3.75rem;
//   background-color: ${(props) => props.theme.bgColor};
//   color: ${(props) => props.theme.textColor};
//   border: 0.08rem solid ${(props) => props.theme.gray4};
//   border-radius: 0.625rem;
//   font-size: 1.25rem;
//   padding-left: 1.25rem;
//   margin-top: 0.6875rem;
//   margin-bottom: ${(props) => props.mb};
//   ::placeholder,
//   ::-webkit-input-placeholder {
//     color: ${(props) => props.theme.gray4};
//   }
//   &:focus {
//     border: 0.09rem solid;
//     border-color: ${(props) => props.theme.primary};
//     outline: none;
//   }
// `;

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import styled from "styled-components";
import "./SignUp.css";

const SignUp = () => {
  const schema = yup.object().shape({
    id: yup.string().max(20).required("This id field is required!"),
    password: yup.string().min(4).max(10).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password Don't Match")
      .required(),
    nickName: yup.string().max(20).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>아이디</label>
      <input
        mb="3.125rem"
        type="text"
        placeholder="아이디를 입력해주세요"
        {...register("id")}
      />
      <p>{errors.id?.message}</p>

      <label>비밀번호</label>
      <input
        mb="3.125rem"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        {...register("password")}
      />
      <p>{errors.password?.message}</p>

      <label>비밀번호 확인</label>
      <input
        mb="3.125rem"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        {...register("confirmPassword")}
      />
      <p>{errors.password?.message}</p>

      <label>닉네임</label>
      <input
        mb="2rem"
        type="text"
        placeholder="닉네임을 입력해주세요"
        {...register("nickName")}
      />
      <p>{errors.nickName?.message}</p>
      <button type="submit">로그인</button>
    </form>
  );
};

export default SignUp;

// import React, { useRef } from 'react'
// import ReactDOM from "react-dom";
// import { useForm } from "react-hook-form";
// // import './SignUp.css';
// function SignUp() {

//   const { register, handleSubmit, watch, formState: { errors }  } = useForm();
//   const password = useRef();
//   password.current = watch("password");
//   // const password = useRef({});
//   // password.current = watch("password", "");

//   const onSubmit = (data) => {
//     console.log(data)
//   };

// {

// }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>아이디</label>
//       <input
//          type="text"
//          placeholder="아이디를 입력해주세요"
//         {...register("id", {
//           pattern: /[A-Za-z]{3}/
//         })}
//         // {...register({pattern: /^\S+@\S+$/i })}
//       />
//       {errors.id && <p>This id field is required</p>}

//       <label>비밀번호</label>
//       <input
//          type="password"
//          placeholder="비밀번호를 입력해주세요"
//         {...register("password", {
//           maxLength: 10
//       })}
//       />
//       {errors.password && errors.password.type === "required"
//         && <p> This password field is required</p>}
//       {errors.password && errors.password.type === "maxLength"
//         && <p> Your input exceed maximum length</p>}

//       <label>비밀번호 확인</label>
//       <input
//   type="password"
//   placeholder="비밀번호를 다시 입력해주세요"
//         {...register("confirmPassword",{
//           validate: {
//             value: (value) =>
//               value === password.current || "비밀번호가 일치하지 않습니다"
//             }
//           }
//         )}
//       />
//       {errors.confirmPassword && errors.confirmPassword.type === "required"
//         && <p> This password confirm field is required</p>}
//  {errors.confirmPassword && ( <p>{errors.confirmPassword.message}</p>)}

//  {/* validate: {
//             matchPreviousPassword: (value) => {
//               const { password } = getValues();
//               return password === value || "비밀번호가 일치하지 않습니다"
//             }
//           } */}

//        {/* {errors.passwordConfirm && errors.password_confirm.type === "validate"
//          && <p>The passwords do not match</p>} */}

//       <label>닉네임</label>
//       <input
//        type="text"
//        placeholder="닉네임을 입력해주세요"
//         {...register("nickName", {
//           minLength: 5
//         })}
//       />
//       {errors.nickName && errors.nickName.type === "required"
//         && <p> This name field is required</p>}
//       {errors.nickName && errors.nickName.type === "minLength"
//         && <p> nickName must have at least 5 characters</p>}

//       <input type="submit"
//         style={{ marginTop: '40px' }}
//       />

//     </form>
//   )
// }

// export default SignUp
