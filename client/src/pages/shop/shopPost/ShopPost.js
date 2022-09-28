import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PostDropdown from "../../../components/dropdowns/PostDropdown";
import { ReactComponent as Camera } from "../../../assets/img/icon/camera-solid.svg";
import PostEditor from "../../../components/editor/PostEditor";
import ShopAddress from "./ShopAddress";

const ShopPost = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [shopPost, setSharePost] = useState({
    memberId: 1,
    title: "",
    description: "",
    pcategory: "",
    image: {},
    address: "",
    tel: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  // 제목 입력
  const titleChange = (el) => {
    setSharePost({ ...shopPost, title: el });
  };

  // 내용 입력
  const contentChange = () => {
    // 마크다운 형식 입력
    const html = editorRef.current.getInstance().getMarkdown();
    setSharePost({ ...shopPost, description: html });
  };

  // 카테고리 입력
  const categoryChange = (el) => {
    setSharePost({ ...shopPost, pcategory: el });
  };

  // 주소 입력
  const addressChange = (el) => {
    setSharePost({ ...shopPost, address: el });
  };

  // 전화번호 입력
  const telChange = (el) => {
    if (el.length <= 13) {
      let tel = el
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "");
      setSharePost({ ...shopPost, tel: tel });
    }
  };

  // 주소 입력 모달 여닫기
  const addressIsOpen = () => {
    setIsOpen(!isOpen);
  };

  // 취소버튼 클릭
  const cancleClick = () => {
    navigate(`/shop/list`);
  };

  // const addImages = (e) => {
  //   const imageLists = e.target.files;
  //   // const img
  // }

  // 데이터 서버 업로드
  const postClick = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/shop`, shopPost)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {}, [shopPost.pcategory]);

  return (
    <MainContainer>
      <ShopAddress
        addressChange={addressChange}
        isOpen={isOpen}
        addressIsOpen={addressIsOpen}
      ></ShopAddress>
      <Title>레저용품 판매점 등록</Title>
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
            <ImgPost
              id="input-file"
              type="file"
              accept="image/*"
              multiple
            ></ImgPost>
          </FlexContainer>
          <PageContainer>
            <ColumnContainer>
              <SubTitle>주소</SubTitle>
              <InputText
                type="text"
                placeholder="주소를 입력해주세요"
                value={shopPost.address}
                onClick={addressIsOpen}
                onChange={addressChange}
              ></InputText>
            </ColumnContainer>
            <ColumnContainer>
              <SubTitle>전화번호</SubTitle>
              <InputText
                type="text"
                placeholder="전화번호를 입력해주세요"
                value={shopPost.tel}
                onChange={(e) => telChange(e.target.value)}
                width="20rem"
                maxlength="13"
              ></InputText>
            </ColumnContainer>
          </PageContainer>
          <SubTitle>내용</SubTitle>
          <PostEditor
            value=" "
            editorRef={editorRef}
            onChange={contentChange}
          />
          <ImgPlusBtn>
            <label htmlFor="input-file">
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
export default ShopPost;

const MainContainer = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: center;
  margin: 5rem 0;

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

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 5rem;
`;

const WriteContainer = styled.div`
  width: 66.25rem;
  display: flex;
  background-color: ${(props) => props.theme.gray6};
  flex-direction: column;
  border-radius: 15px;
`;

const SubTitle = styled.div`
  font-size: 1.375rem;
  margin: 1rem;
`;

const TextDiv = styled.div`
  margin: 5.3125rem;

  .toastui-editor-toolbar {
    box-sizing: border-box;
  }
`;

const InputText = styled.input`
  width: ${(props) => props.width || "32.5rem"};
  height: 3.44rem;
  color: ${(props) => props.theme.textColor};
  padding: 1rem;
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
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
