import React from "react";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import PostDropdown from "../../../components/dropdowns/PostDropdown";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";



const ShareEdit = () => {
  const navigate = useNavigate();

  const [productData , setProductData] = useState()
  const memberId = localStorage.getItem("memberid");
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();
  const [imageSrc, setImageSrc] = useState();
  console.log(productData)
  const { id } = useParams();

  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/product/${id}`)
      .then((res) => setProductData({ ...productData, ...res.data }));
  };

  const titleChange = (el) => {
    setTitle(el);
  };
  const categoryChange = (el) => {
    setCategory(el);
  };
  const contentChange = (el) => {
    setContent(el);
  };



  const EditClick = async () => {
    }
  ;
  useEffect(() => {
    getData();
  }, []);

  return (
    <MainContainer>
      <Title>공유 물품 수정</Title>
      <WriteContainer>
        <TextDiv>
          <SubTitle>제목</SubTitle>
          <PageContainer>
            <InputText
              type="text"
              defaultValue={productData.title}
              placeholder="제목을 입력해주세요"
              onChange={(e) => titleChange(e.target.value)}
            ></InputText>
            <PostDropdown categoryChange={categoryChange} pcategory={productData.pcategory.pcategoryName} />
          </PageContainer>
          <SubTitle>내용</SubTitle>
          <ContentBox
            placeholder="내용을 입력해주세요"
            defaultValue={productData.description}
            onChange={(e) => contentChange(e.target.value)}
          ></ContentBox>
          {/* <ImgContainer>
            {imageSrc.length !== 0 &&
              imageSrc.map((value) => (
                <Imgbox>{<img src={value}></img>}</Imgbox>
              ))}
          </ImgContainer> */}
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
const ContentBox = styled.textarea`
  height: 42.5rem;
  width: 100%;
  border-radius: 15px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  padding: 1rem;
  resize: none;
  @media ${(props) => props.theme.mobile} {
    height: 25rem;
    ::placeholder {
      font-size: 1rem;
    }
  }
`;

