import React, { useState } from "react";
import styled from "styled-components";
import MyPageHeader from "./MyPageHeader";
import ModalConfirm from "../../components/ui/modals/ModalConfirm";
import Validations from "../register/Validations";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// /mypage/favorite

const schema = yup.object().shape({
  nickname: yup
    .string()
    .min(2, "최소 2글자 이상 입력해야 합니다.")
    .max(16, "최대 16글자 까지 입력할 수 있습니다.")
    .required("닉네임은 필수입력 항목 입니다."),
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
});

const MyPageEdit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 모달창의 확인버튼을 눌렀을때의 동작
  const handleModal = () => {
    setIsOpen(!isOpen);
    // navigate(`/member`);
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("authorization")}`,
  };

  const onSubmit = async (data) => {
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}/member/${id}`,
        // `${process.env.REACT_APP_API_URL}/member`,
        { nickname: data.nickname, password: data.password },
        { headers: headers }
      )
      .then(() => {
        // navigate(`/members/${id}`);
        navigate(`/`);
        console.log("ok");
        console.log(data);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <MFContainer>
        <MyPageHeader />
        <BtnContainer>
          <Link to="/mypage/favorite">
            <button>관심목록</button>
          </Link>
          <Link to="/mypage/mypost">
            <button>내가 쓴 게시글</button>
          </Link>
          <Link to="/chat/list/:id">
            <button>채팅 목록</button>
          </Link>
          <Link to="/mypage/edit">
            <button className="active">회원정보 수정</button>
          </Link>
          <button>회원 탈퇴</button>
        </BtnContainer>

        <EditContainer>
          <EditContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ marginBottom: "2.9375rem" }}>
                <label>닉네임</label>
                <input
                  type="text"
                  placeholder="새로운 님네임을 입력해주세요"
                  {...register("nickname")}
                />
                {errors.nickname && (
                  <Validations value={errors.nickname.message} />
                )}
              </div>

              <div style={{ marginBottom: "2.9375rem" }}>
                <label>비밀번호</label>
                <input
                  type="password"
                  placeholder="새로운 비밀번호를 입력해주세요"
                  {...register("password")}
                />
                {errors.password && (
                  <Validations value={errors.password.message} />
                )}
              </div>

              <div style={{ marginBottom: "2.9rem" }}>
                <label>비밀번호 확인</label>
                <input
                  type="password"
                  placeholder="새로운 비밀번호를 다시 입력해주세요"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <Validations value={errors.confirmPassword.message} />
                )}
              </div>

              <button type="submit">수정</button>
              <ModalConfirm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleModal={handleModal}
                children={"회원정보가 변경되었습니다."}
              />
            </form>
          </EditContent>
        </EditContainer>
      </MFContainer>
    </>
  );
};

export default MyPageEdit;

const MFContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 53.75rem;
  height: 3.75rem;
  margin-bottom: 1.8125rem;

  button {
    width: 8.75rem;
    height: 3.75rem;
    border-radius: 0.625rem;
    border: 0.125rem solid ${(props) => props.theme.gray4};
    background-color: ${(props) => props.theme.bgColor};
    font-size: 1.125rem;
    font-family: "NotoSansKR-Bold";
    color: ${(props) => props.theme.gray3};
    :hover {
      background-color: ${(props) => props.theme.primary};
      border: none;
      color: ${(props) => props.theme.white};
    }
    &:focus {
      background-color: ${(props) => props.theme.primary};
      border: none;
      color: ${(props) => props.theme.white};
    }
  }

  .active {
    background-color: ${(props) => props.theme.primary};
    border: none;
    color: ${(props) => props.theme.white};
  }
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.5625rem;
  width: 31.25rem;
  height: 40.625rem;
  margin: -1rem auto 8.875rem auto;

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
`;
