import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import defaultAvatar from "../../../assets/img/avatar/avatar.jpg";
// import { ReactComponent as Xmark } from "../../../assets/img/icon/xmark-solid.svg";
import { useParams } from "react-router-dom";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var client = null;

const ChatDetail = () => {
  const MyId = localStorage.getItem("memberid");
  const { id } = useParams(); // 룸아이디
  // const navigate = useNavigate();
  // const [sellerId, setSellerId] = useState("");
  // const [sellerName, setSellerName] = useState("");
  // const [msg, setMsg] = useState(""); // 보내는 메세지
  // const [data, setData] = useState(""); // 받는 메세지

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("authorization")}`,
  };

  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    // username: "",
    // receivername: "",
    connected: false,
    // message: "",
    chatRoomId: "",
    memberId: "", // 로그인한 회원
    content: "",
  });

  /////////
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    let sock = new SockJS(
      `${process.env.REACT_APP_API_URL}/gs-guide-websocket`
    );
    const client = over(sock);
    client.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    client.subscribe(`/queue/addChatToClient/${id}`, onPrivateMessage); // 룸아이디
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      memberId: userData.memberId,
    };
    client.send(`/app/chat/${id}`, {}, JSON.stringify(chatMessage));
  };

  // subscribe

  const onPrivateMessage = (payload) => {
    console.log(payload); // 클라이언트가 서버로부터 받는 데이터
    var payloadData = JSON.parse(payload);
    if (privateChats.get(payloadData.memberId)) {
      privateChats.get(payloadData.memberId).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData); // 빈배열에 payload.body를 푸쉬
      privateChats.set(payloadData.memberId, list); // (key, value)
      setPrivateChats(new Map(privateChats)); // ?
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, content: value });
  };

  const sendPrivateValue = () => {
    if (client) {
      var chatMessage = {
        // senderName: userData.username,

        chatRoomId: id,
        memberId: userData.memberId, // 로그인한 회원
        content: userData.content,
      };

      if (userData.memberId !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      client.send(`/app/chat/${id}`, {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, content: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, memberId: value });
  };

  const registerUser = () => {
    connect();
  };

  // const getSellerId = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}/v1/chat/room/${id}`)
  //     .then((res) => {
  //       setSellerId(res.data.sellerId);
  //       console.log(res.data.sellerId);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // // 왜 요청이 됐다가 안됐다가 하지?
  // const getSellerName = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}/v1/members/${sellerId}`, {
  //       headers: headers,
  //     })
  //     .then((res) => {
  //       setSellerName(res.data.memberName);
  //       console.log(res.data.memberName);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleInput = (e) => {
  //   setMsg(e.target.value);
  // };
  // 인풋창에 값을 입력하고 전송 버튼을 누르면 handleInput함수가 실행되면서 인풋값을 setMsg에 넣어준다.

  // useEffect(() => {
  //   getSellerId();
  //   getSellerName();
  // }, []);
  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => {
                    setTab(name);
                  }}
                  className={`member ${tab === name && "active"}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="chat-content">
            <ul className="chat-messages">
              {[...privateChats.get(tab)].map((chat, index) => (
                <li
                  className={`message ${
                    chat.memberId === userData.memberId && "self"
                  }`}
                  key={index}
                >
                  {chat.memberId !== userData.memberId && (
                    <div className="avatar">{chat.memberId}</div>
                  )}
                  <div className="message-data">{chat.content}</div>
                  {chat.memberId === userData.memberId && (
                    <div className="avatar self">{chat.memberId}</div>
                  )}
                </li>
              ))}
            </ul>

            <div className="send-message">
              <input
                type="text"
                className="input-message"
                placeholder="enter the message"
                value={userData.content}
                onChange={handleMessage}
              />
              <button
                type="button"
                className="send-button"
                onClick={sendPrivateValue}
              >
                send
              </button>
            </div>
          </div>
        </div>
      ) : (
        // 유저가 처음에 입력하는 부분
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.memberId}
            onChange={handleUsername}
            margin="normal"
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>

    // <>
    //   <CDContainer>
    //     <h1>채팅</h1>
    //     <div>{data}</div>
    //     <CDContent>
    //       <ContentTop>
    //         <AvatarWrapper src={defaultAvatar}></AvatarWrapper>
    //         <div className="name">{sellerName}</div>
    //         <XmarkWrapper
    //           onClick={() => {
    //             navigate(`/`);
    //           }}
    //         >
    //           <Xmark />
    //         </XmarkWrapper>
    //       </ContentTop>
    //       <ContentMiddle></ContentMiddle>
    //       <ContentBottom>
    //         <textarea
    //           value={userData.message}
    //           onChange={handleMessage}
    //           placeholder="메세지를 입력하세요"
    //         />
    //         <button
    //           onClick={() => {
    //             sendMessage(msg);
    //             setMsg("");
    //           }}
    //         >
    //           전송
    //         </button>
    //       </ContentBottom>
    //     </CDContent>
    //   </CDContainer>
    // </>
  );
};

export default ChatDetail;
