import React from "react";
import styled from "styled-components";
import ShareCard from "./ShareCard";

const ShareCardContent = ({ data }) => {
  return (
    <CardContent>
      {data !== null &&
        data.map((el) => (
          <ShareCard
            key={el.productId}
            id={el.productId}
            title={el.title}
            description={el.description}
            status={el.productStatus}
            image01={el.pimageList[0]}
            favoriteCount={el.favoriteCount}
            favoriteStatus={el.favoriteStatus}
          />
        ))}
    </CardContent>
  );
};

export default ShareCardContent;

const CardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
