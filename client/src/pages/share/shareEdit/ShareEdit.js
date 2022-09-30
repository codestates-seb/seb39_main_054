import React from "react";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import PostDropdown from "../../../components/dropdowns/PostDropdown";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Camera } from "../../../assets/img/icon/camera-solid.svg";
import PostEditor from "../../../components/editor/PostEditor";

const ShareEdit = () => {
  const navigate = useNavigate();
  const [sharePost, setSharePost] = useState({
    title: "",
    description: "",
    status: "",
    pcategory: "",
    image: [],
  });
  const { id } = useParams();
  const [imageSrc, setImageSrc] = useState([]);

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
    const selectImg = el.target.files;
    const imgList = [...imageSrc];
    for (let i = 0; i < selectImg.length; i++) {
      const imgurl = URL.createObjectURL(selectImg[i]);
      imgList.push(imgurl);
    }
    setImageSrc(imgList);
    setSharePost({ ...sharePost, image: imgList });
  };
  useEffect(() => {
    if ([...imageSrc].length > 6) {
      alert("이미지의 최대 갯수는 6개입니다!!");
      setImageSrc(imageSrc.slice(0, 6));
    }
  }, [imageSrc]);

  const EditClick = async () => {
    if (
      sharePost.title === "" ||
      sharePost.description === "" ||
      sharePost.pcategory === "카테고리"
    ) {
      alert("제목, 내용이 비어있으면 안되고 카테고리를 선택해주세요");
    } else {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/product/${id}`, sharePost)
        .then(console.log(sharePost))
        .then(alert("수정되었습니다"))
        .catch((err) => console.log(err));
    }
  };
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/product/${id}`)
      .then((res) => setSharePost({ ...sharePost, ...res.data }));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [imageSrc]);
  const desc = sharePost.description
  return (
    <MainContainer>
      <Title>공유 물품 수정</Title>
      <WriteContainer>
        <TextDiv>
          <SubTitle>제목</SubTitle>
          <PageContainer>
            <InputText
              type="text"
              defaultValue={sharePost.title}
              placeholder="제목을 입력해주세요"
              onChange={(e) => titleChange(e.target.value)}
            ></InputText>
            <PostDropdown categoryChange={categoryChange} />
          </PageContainer>
          <SubTitle>내용</SubTitle>
          <PostEditor
            value= " "
            editorRef={editorRef}
            onChange={contentChange}
          />
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
            {imageSrc.length !== 0 &&
              imageSrc.map((value) => (
                <Imgbox>{<img src={value}></img>}</Imgbox>
              ))}
          </ImgContainer>
          <BtnDiv>
            <Link to={`/share/detail/${id}`}>
              <CancelBtn>취소</CancelBtn>
            </Link>
            <EditBtn onClick={EditClick}>수정</EditBtn>
          </BtnDiv>
        </TextDiv>
      </WriteContainer>
    </MainContainer>
  );
};

export default ShareEdit;
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
const EditBtn = styled.button`
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
  :hover {
  }
  img {
    border-radius: 15px;
    width: 100%;
    height: 100%;
    border: none;
    :hover {
      background-color: red;
    }
  }
`;
