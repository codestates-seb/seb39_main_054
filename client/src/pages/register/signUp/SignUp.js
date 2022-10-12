import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ModalConfirm from "../../../components/ui/modals/ModalConfirm.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Validations from "../Validations";

const schema = yup.object().shape({
  id: yup
    .string()
    .min(2, "최소 2글자 이상 입력해야 합니다.")
    .max(16, "최대 16글자 까지 입력할 수 있습니다.")
    .matches(/^[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/, "영문으로만 입력할 수 있습니다.")
    .required("아이디는 필수입력 항목 입니다."),
  password: yup
    .string()
    .min(8, "최소 8글자 이상 입력해야 합니다.")
    .max(16, "최대 16글자 까지 입력할 수 있습니다.")
    .matches(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W))/,
      "영문, 숫자, 특수문자가 포함되어야 합니다."
    )
    .matches(/^[^\s]+$/, "띄어쓰기를 사용할 수 없습니다.")
    .required("비밀번호는 필수입력 항목 입니다."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 다시 입력해주세요."),

  nickname: yup
    .string()
    .min(2, "최소 2글자 이상 입력해야 합니다.")
    .max(16, "최대 16글자 까지 입력할 수 있습니다.")
    .required("닉네임은 필수입력 항목 입니다."),
});

const SignUp = () => {
  const [isOpen, setIsOpen] = useState(false); // 모달창 열림 닫힘 상태
  const [modaltext, setModalText] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const duplicateCheck = () => {
    setModalText("이미 가입된 아이디입니다.");
    setIsOpen(!isOpen);
  };

  const successSignup = () => {
    setModalText("회원가입이 완료되었습니다!");
    setIsOpen(!isOpen);
  };

  // 모달창의 확인버튼을 눌렀을때의 동작
  const handleModal = () => {
    setIsOpen(!isOpen);
    navigate(`/login`);
  };

  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/v1/members/signup`, {
        memberName: data.id,
        nickname: data.nickname,
        password: data.password,
      })
      .then((res) => {
        successSignup();
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 500") {
          duplicateCheck();
        }
      });
  };

  const onError = (error) => {
    // console.log(error);
  };

  return (
    <SignupContainer>
      <h1>회원가입</h1>
      <SignupContent>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div style={{ marginBottom: "1.05rem" }}>
            <label>아이디</label>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              {...register("id")}
            />
            {errors.id && <Validations value={errors.id.message} />}
          </div>
          <div style={{ marginBottom: "2.3rem" }}>
            <label>
              <div className="text-wrapper">
                <div className="text">비밀번호</div>
                <div className="text-small">
                  (영문, 숫자, 특수문자를 포함한 8~16자리)
                </div>
              </div>
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
            />
            {errors.password && <Validations value={errors.password.message} />}
          </div>
          <div style={{ marginBottom: "2.3rem" }}>
            <label>비밀번호 확인</label>
            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <Validations value={errors.confirmPassword.message} />
            )}
          </div>
          <div style={{ marginBottom: "1.4rem" }}>
            <label>닉네임</label>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              {...register("nickname")}
            />
            {errors.nickname && <Validations value={errors.nickname.message} />}
          </div>
          <button type="submit">회원가입</button>
          <ModalConfirm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleModal={handleModal}
            children={modaltext}
          />
        </form>
      </SignupContent>
    </SignupContainer>
  );
};

export default SignUp;

const SignupContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    margin: 3.8rem 0 1.3125rem 0;
    font-size: 2.5rem;
    font-family: "NotoSansKR-Medium";
  }
`;

const SignupContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.5625rem;
  width: 31.25rem;
  height: 42.5rem;
  margin: 0 auto 8.875rem auto;

  label {
    font-size: 1.5rem;
    padding: 0 0 0 0.625rem;

    .text-wrapper {
      display: flex;
    }
    .text {
      padding: 0 0 0 0.625rem;
    }
    .text-small {
      font-size: 1rem;
      padding: 0 0 0 0.4rem;
      margin-top: 0.3rem;
    }
  }

  input {
    width: 28.125rem;
    height: 3.75rem;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    border: 0.08rem solid ${(props) => props.theme.gray4};
    border-radius: 0.625rem;
    font-size: 1.25rem;
    padding-left: 1.25rem;
    margin-top: 0.6875rem;
    ::placeholder,
    ::-webkit-input-placeholder {
      color: ${(props) => props.theme.gray4};
    }
    &:focus {
      border: 0.09rem solid;
      border-color: ${(props) => props.theme.primary};
      outline: none;
    }
  }

  p {
    color: #bf1650;
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
