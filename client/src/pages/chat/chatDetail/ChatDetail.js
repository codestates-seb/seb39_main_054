import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../../assets/img/avatar/avatar.jpg";
import { ReactComponent as Xmark } from "../../../assets/img/icon/xmark-solid.svg";
import { useParams } from "react-router-dom";
import { over } from "stompjs";
import SockJS from "sockjs-client";
// import "./ChatDetail.css";

let client = null;

const ChatDetail = () => {
  const memberId = localStorage.getItem("memberid");
  const { id } = useParams(); // 룸아이디
  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("authorization")}`,
  };
  const [sellerId, setSellerId] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [msg, setMsg] = useState(""); // 보내는 메세지
  const [data, setData] = useState(""); // 받는 메세지

  const connection = () => {
    let sock = new SockJS(
      `${process.env.REACT_APP_API_URL}/gs-guide-websocket`
    );
    const client = over(sock);
    // 1. connection이 맺어지면 실행
    client.connect({}, () => {
      // 3. 구독 / 받는 메세지? / 보낼 주소는 보통 roomId로 하는편인듯 / newMessage.content -> 메세지!
      client.subscribe(
        `/queue/addChatToClient/${id}`, // 룸아이디
        (chat) => {
          const newMessage = JSON.parse(chat.body);
          setData(data.concat(newMessage)); // 그럼 data 배열은 받은 메세지들을 차곡차곡 담게 됨. -> data를 뿌려준다.
          // setData(newMessage); // 그럼 data 배열은 받은 메세지들을 차곡차곡 담게 됨. -> data를 뿌려준다.
          console.log(chat);
        },
        {}
      );
      // .unsubscribe();
    });
    // 위의 콜백함수는 클라이언트가 서버로부터 메세지(data)를 전달받을때 실행된다.
    // 특정 채팅방에서 나가거나 해당 어플리케이션에서 나갔을 경우 상대방이 보낸 메세지를 읽지 않음으로 표시하기 위해 구독을 끊어준다.
    // 전달하는 메세지 / 전달받는 메세지를 따로 변수에 담아준다. --> 그래야 css 작업할 수 있을듯. 근데 이게 같은 내용 아닌가?
    // return () => client.disconnect();
    // }, [client, memberId]); // <--- ???
  };

  // 2. 메세지 보내기 / 보내는 메세지? / 인풋창에 메세지 적고 '버튼'을 누르면 발생하는 이벤트.
  const sendMessage = () => {
    let chatMessage = {
      chatRoomId: id,
      memberId: memberId, // 로그인한 회원
      content: msg,
    };

    client.send(`/app/chat/${id}`, {}, JSON.stringify(chatMessage));
    console.log(chatMessage);
    // setUserData({ ...userData, content: "" });
  };

  const getSellerId = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/chat/room/${id}`)
      .then((res) => {
        setSellerId(res.data.sellerId);
        // console.log(res.data.sellerId);
      })
      .catch((err) => console.log(err));
  };
  // 왜 요청이 됐다가 안됐다가 하지?
  const getSellerName = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/members/${sellerId}`, {
        headers: headers,
      })
      .then((res) => {
        setSellerName(res.data.memberName);
        // console.log(res.data.memberName);
      })
      .catch((err) => console.log(err));
  };

  const handleInput = (e) => {
    setMsg(e.target.value);
  };
  // 인풋창에 값을 입력하고 전송 버튼을 누르면 handleInput함수가 실행되면서 인풋값을 setMsg에 넣어준다.

  useEffect(() => {
    getSellerId();
    getSellerName();
    connection();
  }, []);

  return (
    <>
      <CDContainer>
        <h1>채팅</h1>
        <div>{data}</div>
        <CDContent>
          <ContentTop>
            <AvatarAndNameWrapper>
              <img src={defaultAvatar} className="avatar"></img>
              <div className="name">{sellerName}</div>
            </AvatarAndNameWrapper>
            <XmarkWrapper
              onClick={() => {
                navigate(`/`);
              }}
            >
              <Xmark />
            </XmarkWrapper>
          </ContentTop>
          <ContentMiddle></ContentMiddle>
          <ContentBottom>
            <textarea
              value={msg}
              onChange={handleInput}
              placeholder="메세지를 입력하세요"
            />
            <button
              onClick={() => {
                sendMessage(msg);
                setMsg("");
              }}
            >
              전송
            </button>
          </ContentBottom>
        </CDContent>
      </CDContainer>
    </>
  );
};

export default ChatDetail;

const CDContainer = styled.div`
  background-color: ${(props) => props.theme.gray6};
  color: ${(props) => props.theme.textColor};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    text-align: center;
    margin: 3.8rem auto;
    font-size: 2.5rem;
    font-family: "NotoSansKR-Medium";
    @media ${(props) => props.theme.mobile} {
      margin: 3.6rem 0 3.1rem 0;
      font-size: 1.5rem;
    }
  }
`;

const CDContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 8.875rem auto;
  @media ${(props) => props.theme.mobile} {
    /* width: 22.5625rem;
    height: 33.5625rem; */
    margin: 0 auto 8.875rem auto;
  }
`;

const ContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 36.5rem;
  height: 4.5625rem;
  margin-bottom: 1.5rem;
  border: 0.31rem solid ${(props) => props.theme.gray4};
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  @media ${(props) => props.theme.mobile} {
    width: 22.25rem;
    height: 4.5625rem;
    margin-bottom: 1.375rem;
    border: 0.1875rem solid ${(props) => props.theme.gray4};
  }
`;

const AvatarAndNameWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .avatar {
    object-fit: contain;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.gray4};
    margin-left: 1rem;
    @media ${(props) => props.theme.mobile} {
      width: 2.625rem;
      height: 2.625rem;
    }
  }
  .name {
    font-size: 1.5rem;
    font-family: "NotoSansKR-Bold";
    margin-left: 1.8rem;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.3rem;
      margin-left: 1.3rem;
    }
  }
`;

const XmarkWrapper = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  margin: -0.7rem 1rem 0 0rem;
  @media ${(props) => props.theme.mobile} {
    width: 0.9rem;
    height: 0.9rem;
    margin: -0.4rem 0.9rem 0 0rem;
  }
  /* img {
    background-color: ${(props) => props.theme.textColor};
  } */
`;

const ContentMiddle = styled.div`
  width: 36.5rem;
  height: 25rem;
  margin-bottom: 1.5rem;
  border: 0.31rem solid ${(props) => props.theme.gray4};
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  @media ${(props) => props.theme.mobile} {
    width: 22.25rem;
    height: 21.6875rem;
    margin-bottom: 1.375rem;
    border: 0.1875rem solid ${(props) => props.theme.gray4};
  }
`;
const ContentBottom = styled.div`
  width: 36.5rem;
  height: 9.0625rem;
  margin-bottom: 1.5rem;
  border: 0.31rem solid ${(props) => props.theme.gray4};
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  @media ${(props) => props.theme.mobile} {
    width: 22.25rem;
    height: 4.5625rem;
    margin-bottom: 1.375rem;
    border: 0.1875rem solid ${(props) => props.theme.gray4};
  }

  textarea {
    border: none;
    resize: none;
    width: 26.7rem;
    margin: 0.8rem 1rem;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-size: 1.25rem;
    font-family: "NotoSansKR-Bold";
    @media ${(props) => props.theme.mobile} {
      width: 15rem;
      height: 2.4rem;
      font-size: 1rem;
    }
    :focus {
      outline: none;
    }
  }
  button {
    width: 6.375rem;
    height: 2.8125rem;
    border-radius: 0.625rem;
    font-size: 1.25rem;
    font-family: "NotoSansKR-Bold";
    margin: 4.78rem 0 0.8rem 0;
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.white};
    @media ${(props) => props.theme.mobile} {
      width: 4.375rem;
      height: 2.125rem;
      font-size: 1rem;
      margin: 1.49rem 0.4rem 0.8rem 0;
    }
    :hover {
      filter: drop-shadow(0rem 0.2rem 0.2rem ${(props) => props.theme.gray4});
    }
  }
`;
