import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../../assets/img/avatar/avatar.jpg";
import { ReactComponent as Xmark } from "../../../assets/img/icon/xmark-solid.svg";
// import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
import axios from "axios";

const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ROOM_SEQ = id;
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [nickname, setNickName] = useState("");
  const memberId = localStorage.getItem("memberid");

  useEffect(() => {
    connect();
    getUserData();

    return () => disconnect();
  }, []);

  const getUserData = async () => {
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "authorization"
    )}`;
    await axios
      .get(`${process.env.REACT_APP_API_URL}/v1/members/${memberId}`)
      .then((res) => {
        setNickName(res.data.nickname);
      });
  };

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_API_URL}/gs-guide-websocket`), // proxy를 통한 접속
      debug: function (str) {
        // console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(
      `/queue/addChatToClient/${ROOM_SEQ}`,
      ({ body }) => {
        setChatMessages((_chatMessages) => [
          ..._chatMessages,
          JSON.parse(body),
        ]);
      }
    );
  };

  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: `/app/chat/${ROOM_SEQ}`,
      body: JSON.stringify({
        chatRoomId: ROOM_SEQ,
        memberId: memberId,
        content: message,
        nickname: nickname,
      }),
    });

    setMessage("");
  };

  return (
    <CDContainer>
      <h1>채팅</h1>
      <CDContent>
        <ContentTop>
          <AvatarAndNameWrapper>
            <img src={defaultAvatar} className="avatar" alt="유저이미지"></img>
            <div className="name">{}</div>
          </AvatarAndNameWrapper>
          <XmarkWrapper
            onClick={() => {
              navigate(-1);
            }}
          >
            <Xmark />
          </XmarkWrapper>
        </ContentTop>
        <ContentMiddle>
          {chatMessages && chatMessages.length > 0 && (
            <ul>
              {chatMessages.map((el, index) => (
                <li
                  key={index}
                  className={
                    el.memberId === Number(memberId)
                      ? "login-user-me"
                      : "login-user-you"
                  }
                >
                  {el.nickname}: {el.content}
                </li>
              ))}
            </ul>
          )}
        </ContentMiddle>
        <ContentBottom>
          <textarea
            type={"text"}
            placeholder={"message"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.which === 13 && publish(message)}
          />
          <button onClick={() => publish(message)}>send</button>
        </ContentBottom>
      </CDContent>
    </CDContainer>
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
  margin: 0 auto 8rem auto;

  @media ${(props) => props.theme.mobile} {
    margin: 0 auto 5rem auto;
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
  svg {
    fill: ${(props) => props.theme.gray4};
    cursor: pointer;
  }

  @media ${(props) => props.theme.mobile} {
    width: 0.9rem;
    height: 0.9rem;
    margin: -0.4rem 0.9rem 0 0rem;
  }
`;

const ContentMiddle = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 36.5rem;
  height: 25rem;
  margin-bottom: 1.5rem;
  border: 0.31rem solid ${(props) => props.theme.gray4};
  border-radius: 1.25rem;
  background-color: ${(props) => props.theme.bgColor};
  overflow: auto;
  font-family: "NotoSansKR-Medium";
  font-size: 1.25rem;
  padding: 1rem;

  li {
    padding: 4px 0;
  }

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.gray4};
    border-radius: 1.25rem;
  }

  .login-user-me {
    display: flex;
    float: right;
    width: 17rem;
    /* flex-direction: row-reverse; */
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.white};
    padding: 10px;
    margin: 0.5rem 0 0.5rem 3rem;
    border-radius: 15px;
    line-height: 1.6rem;
    @media ${(props) => props.theme.mobile} {
      width: 14rem;
    }
  }

  .login-user-you {
    display: flex;
    float: left;
    width: 17rem;
    background-color: ${(props) => props.theme.gray4};
    padding: 10px;
    margin: 8px 0;
    border-radius: 15px;
    line-height: 1.6rem;
    @media ${(props) => props.theme.mobile} {
      width: 14rem;
    }
  }

  @media ${(props) => props.theme.mobile} {
    width: 22.25rem;
    height: 21.6875rem;
    margin-bottom: 1.375rem;
    border: 0.1875rem solid ${(props) => props.theme.gray4};
    font-size: 15.5px;
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
