import styled from "styled-components";
import { useState, useEffect} from "react";
import PostDropdown from "../../../components/dropdowns/PostDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Camera } from "../../../assets/img/icon/camera-solid.svg";

const SharePost = () => {
  const navigate = useNavigate();
  // const isMobile = useMediaQuery({ maxWidth: 786 });
  const memberId = localStorage.getItem("memberid");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageSrc, setImageSrc] = useState({});
  
  // const [sharePost, setSharePost] = useState({
  //   memberId: memberId,
  //   title: "",
  //   description: "",
  //   status: "대여가능",
  //   pcategory: "",
  //   image: {},
  // });

  const titleChange = (el) => {
    setTitle(el);
  };
  const categoryChange = (el) => {
    setCategory(el);
  };
  const contentChange = (el) => {
    setContent(el)
  };

  const ImageChange = (el) => {
    setImageSrc(el.target.files);
  };
  useEffect(() => {}, [imageSrc]);

  const cancleClick = () => {
    navigate(`/share/list`);
  };

  const postClick = async () => {
    const formData = new FormData();
    
    // formData.append("productPostDetailDto.title" , title);
    // formData.append("productPostDetailDto.description" , content);
    // formData.append("productPostDetailDto.pcategoryName" , category);
    // formData.append("multipartFileList" , imageSrc);
    console.log(formData)
    // axios
    // .post(`${process.env.REACT_APP_API_URL}/product` , formData ,{
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   data: formData,
    // })
    // .then((res) => alert("성공"))
    // .catch((err) => console.log(err))
    // await axios({
    //   method : "POST" ,
    //   url : `${process.env.REACT_APP_API_URL}/v1/product`,
    //   mode : "cors",
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   data: formData,
    // })

  };
  const deleteClick = (idx) => {
    setImageSrc([
      ...imageSrc.slice(0, idx),
      ...imageSrc.slice(idx + 1, imageSrc.length),
    ]);
  };
  useEffect(() => {

  }, []);
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
          <ContentBox placeholder="내용을 입력해주세요" onChange={(e) =>contentChange(e.target.value)}>
          </ContentBox>
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
            {/* {imageSrc.length !== 0 &&
              imageSrc.map((value) => (
                <>
                <ImagePostDiv>
                <Imgbox >
                {<img src={value}></img>} 
                </Imgbox>
                </ImagePostDiv>
                </>
              ))} */}
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
  @media ${(props) => props.theme.tabletL} {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 2.5rem;
  text-align: center;
  margin: 5rem;
  @media ${(props) => props.theme.mobile} {
    font-size: 1.5rem;

  }
`;
const WriteContainer = styled.div`
  width: 66.25rem;
  
  display: flex;
  background-color: ${(props) => props.theme.gray6};
  flex-direction: column;
  /* margin: 0rem 26.875rem 5rem; */
  border-radius: 15px;

  @media ${(props) => props.theme.tabletL} {
    width: 50rem;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 40rem;
  }

  @media ${(props) => props.theme.mobile} {
    width: 25rem;
  }
`;
const SubTitle = styled.div`
  font-size: 1.375rem;
  margin: 1rem;
`;
const TextDiv = styled.div`
  margin: 5.3125rem;
  @media ${(props) => props.theme.mobile} {
    margin: 2rem;
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
  @media ${(props) => props.theme.tabletL} {
    width: 100%;
  }
  @media ${(props) => props.theme.mobile} {
    height: 2.5rem;
    ::placeholder{
      font-size: 1rem;
    }
  }
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
  @media ${(props) => props.theme.mobile} {
    width: 5rem;
    height:2rem;
    font-size: 1rem;
  }
`;
const PostBtn = styled.button`
  width: 8.44rem;
  height: 3.125rem;
  background-color: ${(props) => props.theme.primary};
  border-radius: 10px;
  color: White;
  margin: 2.5rem 2rem;
  font-size: 1.375rem;
  @media ${(props) => props.theme.mobile} {
    width: 5rem;
    height:2rem;
    font-size: 1rem;
  }
`;
const ImgPost = styled.input`
  font-size: 1.375rem;
  margin: 2rem 0rem 0.5rem 0.5rem;
  display: none;
`;
const ImgDiv = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 5rem;
  height: 5rem;
  background-color: ${(props) => props.theme.gray6};
  border-radius: 15px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textColor};
  
  @media ${(props) => props.theme.mobile} {
    width: 3rem;
    height:3rem;
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${(props) => props.theme.textColor};
    cursor: pointer;
    @media ${(props) => props.theme.mobile} {
    width: 1rem;
    height:1rem;
  }
  }
`;
const ImgContainer = styled.div`
  display: flex;
`;
const Imgbox = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 15px;
  border: solid 0.1875rem;
  border-color: ${(props) => props.theme.gray5};
  justify-content: center;
  align-items: center;
  :hover {
  }
  img {
    border-radius: 15px;
    width: 100%;
    height: 100%;
    border: none;
  }
`;
const ImagePostDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-left: 2rem;
  justify-content: center;
  align-items: center;
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
    ::placeholder{
      font-size: 1rem;
    }
  }
`;

