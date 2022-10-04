import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import MyPageNav from "../MyPageNav";
import MyPageDropdownMobile from "../../../components/dropdowns/MyPageDropdownMobile";
import ModalConfirm from "../../../components/ui/modals/ModalConfirm";
import Validations from "../../register/Validations";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import defaultAvatar from "../../../assets/img/avatar/avatar.jpg";

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
  const isMobile = useMediaQuery({ maxWidth: 786 });
  const [myNickname, setMyNickname] = useState("");

  const [image, setImage] = useState({
    imageFile: "", // 서버에 보낼 실제 이미지 파일
    previewURL: defaultAvatar, // 미리 보여줄 이미지의 경로
  });

  let inputRef;

  const categoryChange = (el) => {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
  const saveImage = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      URL.revokeObjectURL(image.previewURL);
      const previewURL = URL.createObjectURL(e.target.files[0]);
      setImage(() => ({
        imageFile: e.target.files[0],
        previewURL: previewURL,
      }));
    }
  };

  // createObjectURL()을 통해 생성한 기존 URL을 폐기
  const deleteImage = () => {
    URL.revokeObjectURL(image.previewURL);
    setImage({
      imageFile: "",
      previewURL: defaultAvatar,
    });
  };

  // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image.previewURL);
    };
  }, []);

  const onSubmit = async (data) => {
    if (image.imageFile) {
      let formData = new FormData();
      formData.append("file", image.imageFile); // (key-'file', value-실제 이미지 파일)

      let dataSet = [
        {
          nickname: data.nickname,
          password: data.password,
        },
      ];
      // Blob 생성자는 새로운 Blob 객체를 반환. 생성 시 인수로 array와 options을 받음.

      formData.append(
        "data",
        new Blob([JSON.stringify(dataSet)], {
          type: "application/json",
        })
      );

      await axios({
        method: "POST",
        // url: `${process.env.REACT_APP_API_URL}/v1/members/${id}`,
        url: `${process.env.REACT_APP_API_URL}/v1/members/2`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      })
        .then((res) => {
          setImage({
            imageFile: "",
            previewURL: defaultAvatar,
          });
          setIsOpen(!isOpen);
          console.log("ok");
          console.log(res);
          console.log(data);
        })
        .catch((err) => console.log(err));
    } else {
      alert("사진을 등록하세요!");
    }
  };

  // 모달창의 확인버튼을 눌렀을때의 동작
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  // 헤더에 들어갈 닉네임 데이터 받기
  const getData = async () => {
    await axios
      // .get(`${process.env.REACT_APP_API_URL}/v1/members/${id}`, {
      .get(`${process.env.REACT_APP_API_URL}/v1/members/2`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("authorization")}`,
        },
      })
      .then((res) => {
        setMyNickname(res.data.nickname);
        console.log(res.data.nickname);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(id);

  // const onSubmit = async (data) => {
  //   await axios
  //     .patch(
  //       // .post(
  //       `${process.env.REACT_APP_API_URL}/v1/members/${id}`,
  //       { nickname: data.nickname, password: data.password },
  //       { headers: headers }
  //     )
  //     .then(() => {
  //       setIsOpen(!isOpen);
  //       console.log("ok");
  //       console.log(data);
  //     })
  //     .catch((error) => console.error(error));
  // };

  return (
    <MEContainer>
      <MHContainer>
        <AvartarContainer>
          <AvartarWrapper>
            <input
              type="file"
              accept="image/*"
              onChange={saveImage}
              // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
              // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
              // onClick={(e) => (e.target.value = null)}
              ref={(refParam) => (inputRef = refParam)}
              style={{ display: "none" }}
            />
            <div className="img-wrapper">
              <img src={image.previewURL} />
            </div>
            <UploadBtn>
              <button onClick={() => inputRef.click()}>Preview</button>
              <button onClick={deleteImage}>Delete</button>
              {/* <button onClick={onSubmit}>Upload</button> */}
            </UploadBtn>
          </AvartarWrapper>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: "1.6875rem" }}>
              <label>닉네임</label>
              <input
                type="text"
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
const AvartarWrapper = styled.div`
  /* @media ${(props) => props.theme.mobile} {
    width: 3.1875rem;
    height: 3.1875rem;
  } */

  img {
    width: 11.25rem;
    height: 11.25rem;
    background-color: aliceblue;
    border-radius: 50%;
  }
`;

const UploadBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin: 0 5px;
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
