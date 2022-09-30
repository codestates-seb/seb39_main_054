// import React, { useState, useEffect, useCallback } from "react";
// import styled from "styled-components";
// import SockJS from "sockjs-client";
// import * as StompJs from "@stomp/stompjs";
// // import InputContainer from "./InputContainer";

// const ChatDetail = () => {
//   const Stomp = require("stompjs"); // --> ??
//   const sock = new SockJS("http://localhost:8080/chat/detail");
//   const client = Stomp.over(sock);

//   // const roomId = ?

//   // 보내는 메세지
//   const [msg, setMsg] = useState("");
//   // 받는 메세지
//   const [data, setData] = useState("");

//   const memberId = localStorage.getItem("memberid");

//   useEffect(() => {
//     // 1. connection이 맺어지면 실행
//     client.connect({}, () => {
//       console.log("STOMP Connection");

//       // 2.접속한 유저의 정보를 서버로 보내기.
//       client.send(
//         "/app/enter",
//         {},
//         JSON.stringify({
//           // chatRoomId: roomId,
//           memberId: memberId,
//         })
//       );
//       // 유저가 로그인하면(접속하면) 접속한 유저의 아이디를 서버로 보내고 서버는 접속한 유저의 정보를 받게 된다.

//       // 클라이언트(메세지와 받을사람아이디를 같이 전송) -> 서버(메세지를 받을 사람에게 전달) -> 클라이언트(받을사람이 메세지 수신)

//       // 4. 구독 / 받는 메세지? / 보낼 주소는 보통 roomId로 하는편인듯 / newMessage.content -> 메세지!
//       client
//         .subscribe(
//           "/queue/addChatToClient/1", // 룸아이디
//           (chat) => {
//             const newMessage = JSON.parse(chat);
//             setData(data.concat(newMessage)); // 그럼 data 배열은 받은 메세지들을 차곡차곡 담게 됨. -> data를 뿌려준다.
//           },
//           {}
//         )
//         .unsubscribe();
//     });
//     // 위의 콜백함수는 클라이언트가 서버로부터 메세지(data)를 전달받을때 실행된다.
//     // 특정 채팅방에서 나가거나 해당 어플리케이션에서 나갔을 경우 상대방이 보낸 메세지를 읽지 않음으로 표시하기 위해 구독을 끊어준다.
//     // 전달하는 메세지 / 전달받는 메세지를 따로 변수에 담아준다. --> 그래야 css 작업할 수 있을듯. 근데 이게 같은 내용 아닌가?

//     return () => client.disconnect();
//   }, [client, memberId]); // <--- ???

//   const sendMessage = (msg) => {
//     // 3. 메세지 보내기 / 보내는 메세지? / 인풋창에 메세지 적고 '버튼'을 누르면 발생하는 이벤트.
//     client.send(
//       `/app/chat/1`, // 룸아이디
//       {},
//       JSON.stringify({
//         // chatRoomId: roomId, // roomId는 어떻게 받지?
//         memberId: memberId,
//         content: msg,
//       })
//     );
//     // 서버는 메세지 받을 대상의 아이디를 받고 이 아이디를 가진 유저에게 메세지를 전달한다.
//     // client.send(`/app/chat/보낼주소`,{헤더(필수 아님)},JSON.stringify(보낼데이터))
//   };

//   const handleInput = useCallback((e) => {
//     setMsg(e.target.value);
//   }, []);

//   // 인풋창에 값을 입력하고 전송 버튼을 누르면 handleInput함수가 실행되면서 인풋값을 setMsg에 넣어준다.
//   // 버튼을 누르면 sendMessage함수가 실행되면서 메세지(msg)와 여러값을 보내준다.

//   return (
//     <>
//       <CDContainer>
//         <h1>채팅</h1>
//         <CDContent>
//           <div>{data}</div>
//           <input type="text" value={msg} onChange={handleInput} />
//           <input
//             type="button"
//             onClick={() => {
//               sendMessage(msg);
//               // setMsg("");
//             }}
//           >
//             전송
//           </input>
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
