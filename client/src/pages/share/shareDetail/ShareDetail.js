import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ShareDetailTitle from "./ShareDetailTitle";
import ShareDetailContent from "./ShareDetailContent";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ShareDetailImg from "./ShareDetailImg";
import DetailEditDropdown from "../../../components/dropdowns/DetailEditDropdown";
import DataLoading from "../../../components/loading/DataLoading";

const ShareDetail = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [myAvatar, setMyAvatar] = useState("");
  const { id } = useParams();

  const memberId = localStorage.getItem("memberid");

  const getData = async () => {
    // header에 토큰값 기본으로 넣기
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "authorization"
    )}`;
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/product/${id}`)
      .then((res) => {
        setData(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setLoading(true);
        setMyAvatar(res.data.member.imageUrl);
      });
  };

  // 채팅방 개설, 채팅상세페이지로 이동
  const openChatting = async () => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/v1/chat/room`, {
        sellerId: data.member.memberId,
        buyerId: memberId,
        productId: data.productId,
      })
      .then((res) => {
        navigate(`/chat/detail/${res.data.id}`);
      })
      // .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <DataLoading></DataLoading>
      ) : (
        !!data && (
          <ShareContainer>
            <Container>
              <Title>{data.title}</Title>
              {data.member.memberId === Number(memberId) && (
                <DetailEditDropdown data={data} />
              )}
              <ShareDetailImg image={data.pimageList}></ShareDetailImg>
              <ShareDetailTitle
                data={data}
                myAvatar={myAvatar}
              ></ShareDetailTitle>
              <ContentContainer>
                <ShareDetailContent content={data}></ShareDetailContent>
              </ContentContainer>
              <Buttondiv onClick={() => openChatting()}>
                <ChatBtn>채팅하기</ChatBtn>
              </Buttondiv>
            </Container>
          </ShareContainer>
        )
      )}
    </>
  );
};

export default ShareDetail;

const ShareContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7.5rem;
  width: 52rem;

  hr {
    margin: 1rem 0rem;
  }
  @media ${(props) => props.theme.tabletL} {
    width: 53.5rem;
    margin: 2.0625rem 0;
  }

  @media ${(props) => props.theme.tabletS} {
    width: 34rem;
    margin: 1.0625rem 0;
  }

  @media ${(props) => props.theme.mobile} {
    width: 23.75rem;
  }
`;
const ContentContainer = styled.div`
  width: 100%;
  word-break: break-all;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  line-height: 1.8rem;
`;

const Title = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
<<<<<<< HEAD
  @media ${(props) => props.theme.mobile} {
    font-size: 2rem;
  }

=======
  line-height: 3.2rem;

  @media ${(props) => props.theme.mobile} {
    margin-top: 2rem;
    font-size: 1.6875rem;
    line-height: 2.2rem;
    font-family: "NotoSansKR-Medium";
  }
>>>>>>> dbe0fc8b597098f37096732082d1fc83e1cf6615
`;

const ChatBtn = styled.button`
  width: 8.125rem;
  height: 8.125rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.primary};
  font-size: 1.25rem;
  font-family: "NotoSansKR-Medium";
  color: ${(props) => props.theme.white};
  padding-top: 0.3rem;
  @media ${(props) => props.theme.mobile} {
    width: 4.9rem;
    height: 4.9rem;
    font-size: 1rem;
  }
`;
const Buttondiv = styled.div`
  text-align: right;
  margin: 4.4rem 0;
`;
