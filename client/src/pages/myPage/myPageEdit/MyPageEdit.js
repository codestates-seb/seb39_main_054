import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import MyPageNav from "../MyPageNav";
import MyPageDropdownMobile from "../../../components/dropdowns/MyPageDropdownMobile";
import ModalConfirm from "../../../components/ui/modals/ModalConfirm";
import Validations from "../../register/Validations";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import defaultAvatar from "../../../assets/img/avatar/avatar.jpg";
import { ReactComponent as Camera } from "../../../assets/img/icon/camera-solid.svg";

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
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const [myNickname, setMyNickname] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [myAvatar, setMyAvatar] = useState("");

  const categoryChange = (el) => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const ImageChange = (el) => {
    setImageSrc(el.target.files);
  };

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("multipartFile", imageSrc[0]); // (key-'file', value-실제 이미지 파일)
    formData.append("nickname", data.nickname);
    formData.append("password", data.password);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/v1/members/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setIsOpen(!isOpen);
      })
      .catch((err) => {
        alert("사진을 등록하세요!");
      });
  };

  const onError = (error) => {
    // console.log(error);
  };

  // 모달창의 확인버튼을 눌렀을때의 동작
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  // 헤더에 들어갈 닉네임 요청
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/members/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("authorization")}`,
        },
      })
      .then((res) => {
        setMyNickname(res.data.nickname);
        setMyAvatar(res.data.imageUrl);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MEContainer>
      <MHContainer>
        <AvartarContainer>
          {myAvatar ? (
            <AvartarWrapper src={myAvatar}></AvartarWrapper>
          ) : (
            <AvartarWrapper src={defaultAvatar}></AvartarWrapper>
          )}
          <ImgPost
            id="input-file"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              ImageChange(e);
            }}
          ></ImgPost>
          <ImgContainer>
            <label htmlFor="input-file">
              <ImgDiv>
                <Camera />
              </ImgDiv>
            </label>
          </ImgContainer>
          <p>{myNickname}님 반갑습니다.</p>
        </AvartarContainer>
      </MHContainer>
      {isMobile && (
        <MyPageDropdownMobile
          categoryChange={categoryChange}
        ></MyPageDropdownMobile>
      )}
      {!isMobile && <MyPageNav></MyPageNav>}
      <EditContainer>
        <EditContent>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div style={{ marginBottom: "1.6875rem" }}>
              <label>닉네임</label>
              <input
                type="text"
                defaultValue={myNickname}
                placeholder="변경할 닉네임을 입력해주세요"
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
                placeholder="변경할 비밀번호를 입력해주세요"
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
                placeholder="변경할 비밀번호를 다시 입력해주세요"
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

const MHContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const AvartarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 79.625rem;
  height: 18.25rem;
  margin: 5rem 0 2.3125rem 0;
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.primary};

  @media ${(props) => props.theme.mobile} {
    width: 24.25rem;
    height: 6.6875rem;
    margin: 1.75rem 0 1.3125rem 0;
  }

  p {
    color: ${(props) => props.theme.white};
    font-size: 1.5rem;
    margin: 1.8rem 0 0 0;

    @media ${(props) => props.theme.mobile} {
      font-size: 0.875rem;
      margin: 0.8rem 0 0 0;
    }
  }
`;
const AvartarWrapper = styled.img`
  object-fit: cover;
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
  @media ${(props) => props.theme.mobile} {
    width: 3.1875rem;
    height: 3.1875rem;
  }
`;

const ImgPost = styled.input`
  display: none;
`;
const ImgDiv = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -3.2rem;
  margin-left: 8.3rem;
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => props.theme.gray6};
  border-radius: 50%;
  color: ${(props) => props.theme.textColor};
  filter: drop-shadow(0rem 0.15rem 0.15rem ${(props) => props.theme.gray3});

  @media ${(props) => props.theme.mobile} {
    width: 2.2rem;
    height: 2.2rem;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
    padding-bottom: 0.05rem;
    fill: ${(props) => props.theme.primary};
    cursor: pointer;
    @media ${(props) => props.theme.mobile} {
      width: 1.3rem;
      height: 1.3rem;
    }
  }
`;
const ImgContainer = styled.div`
  display: flex;
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
  @media ${(props) => props.theme.mobile} {
    width: 24.25rem;
    height: 26rem;
    margin: 0.2rem auto 4rem auto;
  }

  label {
    font-size: 1.5rem;
    padding: 0 0 0 0.625rem;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.1rem;
      padding: 0 0 0 0.625rem;
      font-family: "NotoSansKR-Medium";
    }

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
      @media ${(props) => props.theme.mobile} {
        font-size: 0.9rem;
        margin-top: 0.13rem;
        padding: 0 0 0 0.3rem;
        font-family: "NotoSansKR-Regular";
      }
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

    @media ${(props) => props.theme.mobile} {
      width: 22.125rem;
      height: 3.125rem;
      font-size: 1.05rem;
      margin-top: 0.6875rem;
    }
  }
`;

const Btns = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 21.875rem;

  @media ${(props) => props.theme.mobile} {
    width: 13.5rem;
    margin-top: -2rem;
  }

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
    @media ${(props) => props.theme.mobile} {
      font-size: 1rem;
      width: 6rem;
      height: 2.687rem;
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
    @media ${(props) => props.theme.mobile} {
      font-size: 1rem;
      width: 6rem;
      height: 2.687rem;
    }
  }
`;
