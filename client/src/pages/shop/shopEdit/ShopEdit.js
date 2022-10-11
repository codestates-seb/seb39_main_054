import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PostDropdown from "../../../components/dropdowns/PostDropdown";
import { ReactComponent as Camera } from "../../../assets/img/icon/camera-solid.svg";
import ShopAddress from "../shopPost/ShopAddress";

const ShopEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const memberId = localStorage.getItem("memberid");
  const [storeData, setStoreData] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [imageSrc, setImageSrc] = useState([]);
  const [imgUrl, setImgUrl] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  // 초기 데이터 가져오기
  const getData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/store/${id}`)
      .then((res) => {
        setStoreData(res.data);
        setTitle(res.data.title);
        setAddress(res.data.address);
        setTel(res.data.phoneNumber);
        setContent(res.data.description);
        setImgUrl(res.data.simageList);
      });
  };

  // 제목 입력
  const titleChange = (el) => {
    setTitle(el);
  };

  // 카테고리 입력
  const categoryChange = (el) => {
    setCategory(el);
  };

  // 주소 입력
  const addressChange = (el) => {
    setAddress(el);
  };

  // 전화번호 입력
  const telChange = (el) => {
    if (el.length <= 13) {
      let tel = el
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "");
      setTel(tel);
    }
  };

  // 내용 입력
  const descriptionChange = (el) => {
    setContent(el);
  };

  // 주소 입력 모달 여닫기
  const addressIsOpen = () => {
    setIsOpen(!isOpen);
  };

  // 취소버튼 클릭
  const cancleClick = () => {
    navigate(`/shop/list`);
  };

  const urlList = [];
  for (let i = 0; i < Object.values(imgUrl).length; i++) {
    urlList.push(imgUrl[i].imageUrl);
  }

  const ImageChange = (el) => {
    const selectImg = el.target.files;
    const imgList = [...imgUrl];
    for (let i = 0; i < selectImg.length; i++) {
      const imgurl = URL.createObjectURL(selectImg[i]);
      imgList.push(imgurl);
    }
    setImgUrl(imgList);
    setImageSrc(...imageSrc, el.target.files);
  };

  // 데이터 서버 업로드
  const postClick = async () => {
    const formData = new FormData();
    formData.append("storePatchDetailDto.memberId", memberId);
    formData.append("storePatchDetailDto.title", title);
    formData.append("storePatchDetailDto.description", content);
    formData.append("storePatchDetailDto.address", address);
    formData.append("storePatchDetailDto.phoneNumber", tel);
    formData.append("storePatchDetailDto.scategoryName", category);

    for (let i = 0; i < urlList.length; i++) {
      formData.append("imageUrlList", urlList[i]);
    }

    if (title.length === 0) {
      alert("제목이 비어있으면 안됩니다");
    } else if (content.length === 0) {
      alert("내용이 비어있으면 안됩니다");
    } else if (category === "카테고리") {
      alert("카테고리를 선택하세요");
    } else if (address === "") {
      alert("주소를 입력하세요");
    } else if (tel === "") {
      alert("전화번호를 입력하세요");
    } else {
      axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
        "authorization"
      )}`;
      await axios
        .patch(`${process.env.REACT_APP_API_URL}/v1/store/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          alert("수정되었습니다!");
          navigate(`/shop/detail/${id}`);
        });
      // .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!!storeData && imgUrl && (
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
                  defaultValue={storeData.title}
                  placeholder="제목을 입력해주세요"
                  onChange={(e) => titleChange(e.target.value)}
                ></InputText>
                <PostDropdown
                  categoryChange={categoryChange}
                  pcategory={storeData.scategory.scategoryName}
                />
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
                    value={address}
                    onClick={addressIsOpen}
                    onChange={addressChange}
                  ></InputText>
                </ColumnContainer>
                <ColumnContainer>
                  <SubTitle>전화번호</SubTitle>
                  <InputText
                    type="text"
                    placeholder="전화번호를 입력해주세요"
                    value={tel}
                    onChange={(e) => telChange(e.target.value)}
                    width="20rem"
                    maxlength="13"
                  ></InputText>
                </ColumnContainer>
              </PageContainer>
              <SubTitle>내용</SubTitle>
              <ContentBox
                placeholder="내용을 입력해주세요"
                value={content}
                onChange={(e) => descriptionChange(e.target.value)}
              ></ContentBox>
              <ImgPost
                id="input-file2"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  ImageChange(e);
                }}
              ></ImgPost>
              <ImgContainer>
                <label htmlFor="input-file2">
                  <ImgDiv>
                    <Camera />
                  </ImgDiv>
                </label>
                {imgUrl.length !== 0 &&
                  imgUrl.map((value, index) => (
                    <>
                      <ImagePostDiv>
                        <Imgbox>{<img src={value} key={index}></img>}</Imgbox>
                      </ImagePostDiv>
                    </>
                  ))}
              </ImgContainer>
              <BtnDiv>
                <CancelBtn onClick={cancleClick}>취소</CancelBtn>
                <PostBtn onClick={postClick}>수정</PostBtn>
              </BtnDiv>
            </TextDiv>
          </WriteContainer>
        </MainContainer>
      )}
    </>
  );
};
export default ShopEdit;

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

  @media ${(props) => props.theme.tabletL} {
    flex-direction: column;
  }
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

  @media ${(props) => props.theme.mobile} {
    font-size: 1.5rem;
  }
`;

const WriteContainer = styled.div`
  width: 66.25rem;
  display: flex;
  background-color: ${(props) => props.theme.gray6};
  flex-direction: column;
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
  width: ${(props) => props.width || "32.5rem"};
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
