import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/actions/logInAction";
import styled from "styled-components";
import axios from "axios";
import ModalConfirm from "../../../components/ui/modals/ModalConfirm.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Validations from "../Validations";
import logo_kakao from "../../../assets/img/sns/kakao_symbol.png";
import logo_google from "../../../assets/img/sns/google_symbol.png";
import logo_naver from "../../../assets/img/sns/naver_symbol.png";

const schema = yup.object().shape({
  id: yup
    .string()
    .min(2, "최소 2글자 이상 입력해야 합니다.")
    .max(16, "최대 16글자 까지 입력할 수 있습니다.")
    .required("아이디를 입력해주세요.")
    .matches(/^[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/, "영문으로만 입력할 수 있습니다."),
  password: yup
    .string()
    .min(8, "최소 8글자 이상 입력해야 합니다.")
    .max(16, "최대 16글자 까지 입력할 수 있습니다.")
    .required("비밀번호를 입력해주세요.")
    .matches(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W))/,
      "영문, 숫자, 특수문자가 포함되어야 합니다."
    ),
});

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const errSignup = () => {
    // alert("사용자가 없습니다");
    setIsOpen(!isOpen);
  };

  // 모달창의 확인버튼을 눌렀을때의 동작
  const handleModal = () => {
    setIsOpen(!isOpen);
    // navigate(`/member`);
  };

  const onSubmit = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        memberName: data.id,
        password: data.password,
      })
      .then((res) => {
        let jwtToken = res.headers.authorization;
        const memberid = res.headers.memberid;
        const userRoles = res.headers.roles;
        localStorage.setItem("authorization", jwtToken);
        localStorage.setItem("memberid", memberid); // (key, value)
        localStorage.setItem("roles", userRoles); // (key, value)
        dispatch(loginSuccess(memberid));
        navigate(`/`);
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 500") {
          errSignup();
          setIsOpen(!isOpen);
        }
      });
  };

  const guestLogin = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/login`, {
        memberName: "guest",
        password: "guest@1234",
      })
      .then((res) => {
        let jwtToken = res.headers.authorization;
        const memberid = res.headers.memberid;
        const userRoles = res.headers.roles;
        localStorage.setItem("authorization", jwtToken);
        localStorage.setItem("memberid", memberid); // (key, value)
        localStorage.setItem("roles", userRoles); // (key, value)
        dispatch(loginSuccess(memberid));
        navigate(`/`);
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 500") {
          errSignup();
          setIsOpen(!isOpen);
        }
      });
  };

  const onError = (error) => {
    // console.log(error);
  };

  return (
    <LoginContainer>
      <h1>ANBD</h1>
      <LoginContent>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div style={{ marginBottom: "4.2rem" }}>
            <label>아이디</label>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              {...register("id")}
            />
            {errors.id && <Validations value={errors.id.message} />}
          </div>
          <div style={{ marginBottom: "3.5rem" }}>
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              {...register("password")}
            />
            {errors.password && <Validations value={errors.password.message} />}
          </div>
          <button type="submit">로그인</button>
          <ModalConfirm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleModal={handleModal}
            children={"사용자가 없습니다"}
          />
        </form>
        <button onClick={guestLogin} className="guest-login">
          게스트 로그인
        </button>
        <p className="divider">
          <span>소셜 로그인</span>
        </p>
        <div className="social">
          <button
            className="social-button"
            style={{ backgroundColor: "#ffe600" }}
          >
            <img
              className="logo-image"
              style={{ width: "2rem" }}
              src={logo_kakao}
              alt="logo_kakao"
            ></img>
          </button>
          <button
            className="social-button"
            style={{ backgroundColor: "#ffffff" }}
          >
            <img
              className="logo-image"
              style={{ width: "1.8rem" }}
              src={logo_google}
              alt="logo_google"
            ></img>
          </button>
          <button
            className="social-button"
            style={{ backgroundColor: "#09c858" }}
          >
            <img
              className="logo-image"
              style={{ width: "2.75rem" }}
              src={logo_naver}
              alt="logo_naver"
            ></img>
          </button>
        </div>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    margin: 3.8rem 0 1.3125rem 0;
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

  label {
    font-size: 1.5rem;
    padding: 0 0 0 0.625rem;
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

  .guest-login{
    background-color: ${(props) => props.theme.primary};
    margin: 1.5rem 0;
    font-size: 1.1rem;
    color: ${(props) => props.theme.white};
    width: 28.125rem;
    height: 2.75rem;
    border-radius: 0.625rem;
    :hover {
      filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
    }
  }

  .divider {
    width: 100%;
    text-align: center;
    border-bottom: 0.1875rem solid ${(props) => props.theme.primary};
    line-height: 0.1rem;
    margin: 3rem 0;

    span {
      font-size: 1rem;
      padding: 0 1.5rem;
      background-color: ${(props) => props.theme.bgColor};
    }
  }

  .social {
    display: flex;
    justify-content: space-between;
    width: 90%;
  }

  .social-button {
    padding-top: 0.3rem;
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 50%;
    border: 0.03125rem solid ${(props) => props.theme.gray4};
    :hover {
      filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
    }
  }
`;
