import styled from "styled-components";
import { useState, useEffect } from "react";
import PostDropdown from "../../../components/dropdowns/PostDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Camera } from "../../../assets/img/icon/camera-solid.svg";
import Modal from "../../../components/ui/modals/ModalConfirm";

const SharePost = () => {
  const navigate = useNavigate();
  // const isMobile = useMediaQuery({ maxWidth: 786 });
  const memberId = localStorage.getItem("memberid");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [imgUrl , setImgUrl] = useState("");

  
  const titleChange = (el) => {
    setTitle(el);
  };
  const categoryChange = (el) => {
    setCategory(el);
  };
  const contentChange = (el) => {
    setContent(el);
  };

  const ImageChange = (el) => {
    
    const selectImg = el.target.files;
    const imgList = [...imgUrl];
    for(let i=0;i<selectImg.length;i++){
      const imgurl = URL.createObjectURL(selectImg[i])
      imgList.push(imgurl);
    }
    setImgUrl(imgList);
    setImageSrc(...imageSrc, el.target.files);

  };

  const cancleClick = () => {
    navigate(`/share/list`);
  };

  const postClick = async () => {
    const formData = new FormData();
    formData.append("productPostDetailDto.memberId", memberId);
    formData.append("productPostDetailDto.title", title);
    formData.append("productPostDetailDto.description", content);
    formData.append("productPostDetailDto.pcategoryName", category);
    // console.log(Object.keys(imageSrc))
    Object.values(imageSrc).forEach((file) =>
      formData.append("multipartFileList", file)
    );
    if(title.length === 0){
      alert("제목이 비어있으면 안됩니다")
    }
    else if(content.length === 0){
      alert("내용이 비어있으면 안됩니다")
    }
    else if(category === "카테고리"){
      alert("카테고리를 선택하세요")
    }
    else if(Object.keys(imageSrc).length === 0){
      alert("한개 이상의 사진은 필수입니다")
    }
    else{
    await axios
      .post(`${process.env.REACT_APP_API_URL}/v1/product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("등록되었습니다!")
        navigate(`/share/detail/${res.data.productId}`)});
    }
  };
  const deleteClick = (idx) => {
    setImageSrc([
      ...imageSrc.slice(0, idx),
      ...imageSrc.slice(idx + 1, imageSrc.length),
    ]);
  };

  useEffect(() => {
    if([...imgUrl].length > 6){
      alert("이미지의 최대 갯수는 6개입니다!!")
      setImgUrl([])
      setImageSrc([])
      

    }
  }, [imgUrl]);
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
          <ContentBox
            placeholder="내용을 입력해주세요"
            onChange={(e) => contentChange(e.target.value)}
          ></ContentBox>
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
            {imgUrl.length !== 0 &&
              imgUrl.map((value , index) => (
                <>
                <ImagePostDiv>
                <Imgbox >
                {<img src={value} key = {index}></img>} 
                </Imgbox>
                </ImagePostDiv>
                </>
              ))}

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
  margin-bottom: 6rem;
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
    ::placeholder {
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
    height: 2rem;
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
    height: 2rem;
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

  @media ${(props) => props.theme.tabletL} {
    width: 4rem;
    height: 4rem;
  }
  @media ${(props) => props.theme.mobile} {
    width: 3rem;
    height: 3rem;
  }


  svg {
    width: 2rem;
    height: 2rem;
    fill: ${(props) => props.theme.textColor};
    cursor: pointer;
    @media ${(props) => props.theme.mobile} {
      width: 1rem;
      height: 1rem;
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
  background-color: ${(props) => props.theme.gray6};
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
  @media ${(props) => props.theme.tabletL} {
    width: 4rem;
    height: 4rem;
  }
  @media ${(props) => props.theme.mobile} {
    width: 3rem;
    height: 3rem;
  }
`;
const ImagePostDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-left: 2rem;
  justify-content: center;
  align-items: center;
  @media ${(props) => props.theme.tabletL} {
    margin-left: 1.5rem;
  }
  @media ${(props) => props.theme.tabletS} {
    margin-left: 0.2rem;
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
