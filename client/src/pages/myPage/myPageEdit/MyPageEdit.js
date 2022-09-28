import React, { useState } from "react";
import styled from "styled-components";
import MyPageHeader from "../MyPageHeader";
import MyPageNav from "../MyPageNav";
import ModalConfirm from "../../../components/ui/modals/ModalConfirm";
import Validations from "../../register/Validations";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("authorization")}`,
  };

  // 모달창의 확인버튼을 눌렀을때의 동작
  const handleModal = () => {
    setIsOpen(!isOpen);
    // navigate(`/member`);
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
    <MEContainer>
      <MyPageHeader />
      <MyPageNav />
      <EditContainer>
        <EditContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: "1.6875rem" }}>
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
              {errors.password && (
                <Validations value={errors.password.message} />
              )}
            </div>
            <div style={{ marginBottom: "4.8125rem" }}>
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
            <Btns>
              <Link to="/mypage/favorite">
                <button className="btn-cancel">취소</button>
              </Link>
              <button className="btn-confirm" type="submit">
                수정
              </button>
            </Btns>
            <ModalConfirm
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleModal={handleModal}
              children={"회원정보가 변경되었습니다."}
            />
          </form>
        </EditContent>
      </EditContainer>
    </MEContainer>
  );
};

export default MyPageEdit;

const MEContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
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
  margin: 1rem auto 5rem auto;

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
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 21.875rem;

  .btn-cancel {
    background-color: ${(props) => props.theme.gray4};
    font-size: 1.375rem;
    color: ${(props) => props.theme.white};
    width: 8.75rem;
    height: 3.75rem;
    border-radius: 0.625rem;
    font-family: "NotoSansKR-Medium";
    :hover {
      filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
    }
  }

  .btn-confirm {
    background-color: ${(props) => props.theme.primary};
    font-size: 1.375rem;
    color: ${(props) => props.theme.white};
    width: 8.75rem;
    height: 3.75rem;
    border-radius: 0.625rem;
    font-family: "NotoSansKR-Medium";
    :hover {
      filter: drop-shadow(0rem 0.25rem 0.25rem ${(props) => props.theme.gray5});
    }
  }
`;
