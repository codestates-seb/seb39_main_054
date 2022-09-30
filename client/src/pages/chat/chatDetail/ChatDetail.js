// import React, { useEffect } from "react";
// import styled from "styled-components";
// import SockJS from "sockjs-client";
// import * as StompJs from "@stomp/stompjs";

// const ChatDetail = () => {
//   const [content, setContent] = useState("");
//   const Stomp = require("stompjs"); // --> ??

//   let sock = new SockJS("http://localhost:8080/chat/detail");
//   let client = Stomp.over(sock);

//   const memberid = localStorage.getItem("memberid");

//   useEffect(() => {
//     // 1. 서버와 연결
//     client.connect({}, () => {
//       console.log("Connected : " + memberid);
//       // 2.접속한 유저의 정보를 서버로 보내기.
//       client.send("/app/join", {}, JSON.stringify(memberid));
//       // 유저가 로그인하면(접속하면) 접속한 유저의 아이디를 서버로 보내고 서버는 접속한 유저의 정보를 받게 된다.

//       // 3.메세지 보내기
//       client.send(
//         `/app/chat/${"메세지 받을 대상"}`,
//         {},
//         JSON.stringify("Hello!")
//       );
//       // 서버는 메세지 받을 대상의 아이디를 받고 이 아이디를 가진 유저에게 메세지를 전달한다.
//       // client.send(`/app/chat/보낼주소`,{헤더(필수 아님)},JSON.stringify(보낼데이터))

//       // 클라이언트(메세지와 받을사람아이디를 같이 전송) -> 서버(메세지를 받을 사람에게 전달) -> 클라이언트(받을사람이 메세지 수신)

//       // 4. 구독
//       client
//         .subscribe(
//           "/queue/addChatToClient/" + memberid,
//           (data) => {
//             const newMessage = JSON.parse(data.body);
//             setContent(newMessage);
//           },
//           {}
//         )
//         .unsubscribe();
//     });
//     // 위의 콜백함수는 클라이언트가 서버로부터 메세지(data)를 전달받을때 실행된다.
//     // 특정 채팅방에서 나가거나 해당 어플리케이션에서 나갔을 경우 상대방이 보낸 메세지를 읽지 않음으로 표시하기 위해 구독을 끊어준다.
//     // 전달하는 메세지 / 전달받는 메세지를 따로 변수에 담아준다. --> 그래야 css 작업할 수 있을듯.

//     return () => client.disconnect();
//   }, [client, memberid, dispatch]); // <--- ???

//   return (
//     <>
//       <CDContainer>
//         <h1>채팅</h1>
//         <CDContent>
//           <div>{content}</div>
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
