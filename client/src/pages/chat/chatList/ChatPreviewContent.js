import React from "react";
import styled from "styled-components";

const ChatPreviewContent = ({ chatList }) => {
  return (
    <PreviewContent>
      {/* {chatList !== null &&
        chatList.map((el) => (
          <ChatPreview
            key={el.id}
            id={el.id}
            roomId={el.roomId}
            name={el.name}
            productId={el.productId}
            sellerId={el.image.sellerId}
            buyerId={el.image.buyerId}
            creationDate={el.creationDate}
            lastEditDate={el.lastEditDate}
            // 여기서 필요한거 빼고 지우기.
          />
        ))} */}
    </PreviewContent>
  );
};

export default ChatPreviewContent;

const PreviewContent = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
`;
