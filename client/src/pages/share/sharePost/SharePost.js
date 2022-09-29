import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
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
  const titleChange = (el) => {
    setSharePost({ ...sharePost, title: el });
  };
  const contentChange = (el) => {
    setSharePost({ ...sharePost, description: el });
  };
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const handleonChange = () => {
    const value = editorRef.current.getInstance().getMarkdown();
    viewRef.current.getInstance().setMarkdown(value);
  };

  const categoryChange = (el) => {
    setSharePost({ ...sharePost, pcategory: el });
  };

  const cancleClick = () => {
    navigate(`/share/list`);
  };
  // const addImages = (e) => {
  //   const imageLists = e.target.files;
  //   // const img
  // }

  const postClick = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/product`, sharePost)
      .then(console.log(sharePost))
      .catch((err) => console.log(err));
  };
  useEffect(() => {}, [sharePost.pcategory]);

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
          <FlexContainer>
            {/* <SubTitle>이미지 첨부</SubTitle> */}

            <ImgPost
              id="input-file"
              type="file"
              accept="image/*"
              multiple
            ></ImgPost>
          </FlexContainer>
          <SubTitle>내용</SubTitle>
          {/* <ContentText placeholder="내용을 입력해주세요" onChange={(e) => contentChange(e.target.value)}></ContentText> */}
          <PostEditor
            value=" "
            editorRef={editorRef}
            onChange={handleonChange}
          />
          <ImgPlusBtn>
            <label for="input-file">
              <ImgDiv>
                <Camera />
              </ImgDiv>
            </label>
          </ImgPlusBtn>
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

  .ck-editor__editable {
    min-height: 42.5rem;
  }
  .ck .ck-editor__main > .ck-editor__editable {
    background: #fff;
  }
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FlexContainer = styled.div`
  display: flex;
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

  .toastui-editor-toolbar {
    height: 100px;
    box-sizing: border-box;
  }
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
const ContentText = styled.textarea`
  height: 55.625rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  vertical-align: top;
  resize: none;
`;
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
  }
`;
