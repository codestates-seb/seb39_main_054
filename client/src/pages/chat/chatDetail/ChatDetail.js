// import React, { useEffect } from "react";
// import styled from "styled-components";
// import SockJS from "sockjs-client";
// import * as StompJs from "@stomp/stompjs";

// const ChatDetail = () => {
//   const Stomp = require("stompjs"); // --> ??

//   let sock = new SockJS("http://localhost:8080/chat/detail");
//   let client = Stomp.over(sock);

//   const memberid = localStorage.getItem("memberid");

//   useEffect(() => {
//     // 1. 서버와 연결
//     client.connect({}, () => {
//       console.log("Connected : " + memberid);
//       // 2.접속한 유저의 정보를 서버로 보내기. --> 이거 필요한 과정이겠지???
//       client.send("/app/join", {}, JSON.stringify(memberid));
//       // 유저가 로그인하면(접속하면) 접속한 유저의 아이디를 서버로 보내서 접속한 유저의 정보를 받게 된다.

//       // 3.메세지 보내기
//       client.send(
//         `/app/chat/${"메세지 받을 대상"}`,
//         {},
//         JSON.stringify("Hello!")
//       );
//       // ${메세지 받을 대상} / 서버는 아이디를 받고 아이디를 가진 유저에게 다시 메세지 내용을 보낸다.
//       // client.send(`/app/chat/보낼주소`,{},JSON.stringify(보낼데이터))

//       // 클라이언트(메세지와 받을사람아이디를 같이 전송) -> 서버(메세지를 받을 사람에게 전달) -> 클라이언트(받을사람이 메세지 수신)

//       // 4. 구독
//       client.subscribe("/queue/addChatToClient/" + memberid, function (data) {
//         const newMessage = JSON.parse(data.body);
//       });
//     });

//     return () => client.disconnect();
//   }, [client, memberid, dispatch]); // <--- ???

//   return (
//     <>
//       <CDContainer>
//         <h1>채팅</h1>
//         <CDContent>
//           <div>{newMessage}</div>
//         </CDContent>
//       </CDContainer>
//     </>
//   );
// };

// export default ChatDetail;

// const CDContainer = styled.div`
//   background-color: ${(props) => props.theme.gray6};
//   color: ${(props) => props.theme.textColor};
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;

//   h1 {
//     text-align: center;
//     margin: 3.8rem auto;
//     font-size: 2.5rem;
//     font-family: "NotoSansKR-Medium";
//   }
// `;

// const CDContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 36.5rem;
//   height: 35.25rem;
//   margin: 0 auto 8.875rem auto;
//   background-color: bisque;
// `;
