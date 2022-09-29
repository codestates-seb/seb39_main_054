import styled from "styled-components";
import { useState, useRef } from "react";
import PostDropdown from "../../../components/dropdowns/PostDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Camera } from "../../../assets/img/icon/camera-solid.svg";
import PostEditor from "../../../components/editor/PostEditor";

const SharePost = () => {
  const navigate = useNavigate();
  const [sharePost, setSharePost] = useState({
    memberId: 1,
    title: "",
    description: "",
    status: "대여가능",
    pcategory: "",
    image: {},
  });
  const [imageSrc, setImageSrc] = useState("");
  const titleChange = (el) => {
    setSharePost({ ...sharePost, title: el });
  };
  const categoryChange = (el) => {
    setSharePost({ ...sharePost, pcategory: el });
  };
  //내용 연결
  const editorRef = useRef(null);
  const contentChange = () => {
    const content = editorRef.current.getInstance().getMarkdown();
    setSharePost({ ...sharePost, description: content });
  };

  const ImageChange = (el) => {
    const reader = new FileReader();
    reader.readAsDataURL(el);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
        console.log(imageSrc)
      };
    });
  };

  const cancleClick = () => {
    navigate(`/share/list`);
  };

  const postClick = async () => {
    if (
      sharePost.title === "" ||
      sharePost.description === "" ||
      sharePost.pcategory === "카테고리"
    ) {
      alert("제목, 내용이 비어있으면 안되고 카테고리를 선택해주세요");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/product`, sharePost)
        .then(console.log(sharePost))
        .then(alert("완료"))
        .catch((err) => console.log(err));
    }
  };
  return (
    <MainContainer>
      <Title>공유 물품 작성</Title>
      <WriteContainer>
        <TextDiv>
          <SubTitle>제목</SubTitle>
          <PageContainer>
            <InputText
              type="text"
              placeholder="제목을 입력해주세요"
              onChange={(e) => titleChange(e.target.value)}
            ></InputText>
            <PostDropdown categoryChange={categoryChange} />
          </PageContainer>

          <SubTitle>내용</SubTitle>
          <PostEditor
            value=" "
            editorRef={editorRef}
            onChange={contentChange}
          />
          <ImgPost
            id="input-file"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              ImageChange(e.target.files[0]);
            }}
          ></ImgPost>
          <ImgContainer>
            <ImgPlusBtn>
              <label htmlFor="input-file">
                <ImgDiv>
                  <Camera />
                </ImgDiv>
              </label>
            </ImgPlusBtn>
            {imageSrc && <Imgbox>{<img src={imageSrc}></img>}</Imgbox>}
          </ImgContainer>
          <BtnDiv>
            <CancelBtn onClick={cancleClick}>취소</CancelBtn>
            <PostBtn onClick={postClick}>등록</PostBtn>
          </BtnDiv>
        </TextDiv>
      </WriteContainer>
    </MainContainer>
  );
};
export default SharePost;

const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 2.5rem;
  text-align: center;
  margin: 5rem;
`;
const WriteContainer = styled.div`
  width: 66.25rem;
  display: flex;
  background-color: ${(props) => props.theme.gray6};
  flex-direction: column;
  /* margin: 0rem 26.875rem 5rem; */
  border-radius: 15px;
`;
const SubTitle = styled.div`
  font-size: 1.375rem;
  margin: 1rem;
`;
const TextDiv = styled.div`
  margin: 5.3125rem;
`;
const InputText = styled.input`
  width: 32.5rem;
  height: 3.44rem;
  color: ${(props) => props.theme.textColor};
  padding: 1rem;
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
`;

// `
const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0rem 0rem -3rem 0rem;
  font-size: 1.375rem;
`;
const CancelBtn = styled.button`
  width: 8.44rem;
  height: 3.125rem;
  background-color: ${(props) => props.theme.gray3};
  color: white;
  border-radius: 10px;
  margin: 2.5rem 2rem;
  font-size: 1.375rem;
`;
const PostBtn = styled.button`
  width: 8.44rem;
  height: 3.125rem;
  background-color: ${(props) => props.theme.primary};
  border-radius: 10px;
  color: White;
  margin: 2.5rem 2rem;
  font-size: 1.375rem;
`;
const ImgPost = styled.input`
  font-size: 1.375rem;
  margin: 2rem 0rem 0.5rem 0.5rem;
  display: none;
`;
const ImgPlusBtn = styled.button`
  width: 5rem;
  height: 5rem;
  background-color: ${(props) => props.theme.gray6};
  border-radius: 15px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textColor};

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${(props) => props.theme.textColor};
    cursor: pointer;
  }
`;
const ImgContainer = styled.div`
  display: flex;
`;
const Imgbox = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 15px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  img {
    border-radius: 15px;
    width: 100%;
    height: 100%;
    border: none;
  }
`;
