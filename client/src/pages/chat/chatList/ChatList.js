import React, { useEffect, useState } from "react";
import styled from "styled-components";
import defaultAvatar from "../../../assets/img/avatar/avatar.jpg";

const ChatList = () => {
  // const { id } = useParams();
  // const [chatList, setChatList] = useState("");

  // const getChatList = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_API_URL}/v1/chat/rooms/${id}`)
  //     .then((res) => {
  //       setChatList(res.data);
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   getChatList();
  // }, []);

  return (
    <CLContainer>
      <h1>채팅</h1>
      <CLContent>
        {/* <ChatPreviewContent chatList={chatList} /> */}
        <ChatPreviewContent
          style={{
            backgroundColor: "#62BF53",
          }}
        >
          <AvatarAndContentWrapper>
            <Avatar src={defaultAvatar} />
            <Content
              style={{
                color: "white",
              }}
            >
              <div className="name">sojournre</div>
              <div className="text">카메라 한달 대여 가능한가요?</div>
            </Content>
          </AvatarAndContentWrapper>
          <Time
            style={{
              color: "white",
            }}
          >
            2 minutes ago
          </Time>
        </ChatPreviewContent>
        <ChatPreviewContent>
          <AvatarAndContentWrapper>
            <Avatar src={defaultAvatar} />
            <Content>
              <div className="name">sojournre</div>
              <div className="text">카메라 한달 대여 가능한가요?</div>
            </Content>
          </AvatarAndContentWrapper>
          <Time>5 minutes ago</Time>
        </ChatPreviewContent>
        <ChatPreviewContent>
          <AvatarAndContentWrapper>
            <Avatar src={defaultAvatar} />
            <Content>
              <div className="name">sojournre</div>
              <div className="text">카메라 한달 대여 가능한가요?</div>
            </Content>
          </AvatarAndContentWrapper>
          <Time>2 hours ago</Time>
        </ChatPreviewContent>
        <ChatPreviewContent>
          <AvatarAndContentWrapper>
            <Avatar src={defaultAvatar} />
            <Content>
              <div className="name">sojournre</div>
              <div className="text">카메라 한달 대여 가능한가요?</div>
            </Content>
          </AvatarAndContentWrapper>
          <Time>16 hours ago</Time>
        </ChatPreviewContent>
        <ChatPreviewContent>
          <AvatarAndContentWrapper>
            <Avatar src={defaultAvatar} />
            <Content>
              <div className="name">sojournre</div>
              <div className="text">카메라 한달 대여 가능한가요?</div>
            </Content>
          </AvatarAndContentWrapper>
          <Time>2 days ago</Time>
        </ChatPreviewContent>
      </CLContent>
    </CLContainer>
  );
};

export default ChatList;

const CLContainer = styled.div`
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

const CLContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 36.5rem;
  height: 35.25rem;
  margin: 0 auto 8.875rem auto;
  @media ${(props) => props.theme.mobile} {
    width: 21.75rem;
    height: 28rem;
    margin: 0 auto 8.875rem auto;
  }
`;

const ChatPreviewContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 36.5rem;
  height: 6.5625rem;
  background-color: ${(props) => props.theme.bgColor};
  border: 0.1875rem solid ${(props) => props.theme.gray4};
  border-radius: 0.9375rem;
  cursor: pointer;
  @media ${(props) => props.theme.mobile} {
    width: 21.75rem;
    height: 4.875rem;
  }
  /* &:focus {
    background-color: ${(props) => props.theme.primary};
    } */
  :hover {
    filter: drop-shadow(0rem 0.2rem 0.2rem ${(props) => props.theme.gray4});
  }
`;

const AvatarAndContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Avatar = styled.img`
  object-fit: contain;
  width: 4.6875rem;
  height: 4.6875rem;
  background-color: gray;
  border-radius: 50%;
  margin-left: 1.375rem;
  @media ${(props) => props.theme.mobile} {
    width: 2.9375rem;
    height: 2.9375rem;
    margin-left: 0.6875rem;
  }
`;
const Content = styled.div`
  color: ${(props) => props.theme.textColor};
  margin-left: 2.06rem;
  @media ${(props) => props.theme.mobile} {
    margin-left: 0.6875rem;
  }
  .name {
    font-size: 1.3rem;
    font-family: "NotoSansKR-Bold";
    margin-bottom: 1rem;
    @media ${(props) => props.theme.mobile} {
      font-size: 1rem;
      margin-bottom: 0.6rem;
    }
  }

  .text {
    font-size: 1.1rem;
    @media ${(props) => props.theme.mobile} {
      font-size: 0.9rem;
    }
  }
`;
const Time = styled.div`
  color: ${(props) => props.theme.gray3};
  font-size: 0.875rem;
  margin: 0.9rem 0.9rem 0 0;
  @media ${(props) => props.theme.mobile} {
    font-size: 0.75rem;
    margin: 0.6rem 0.6rem 0 0;
  }
`;
