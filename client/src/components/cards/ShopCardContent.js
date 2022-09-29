import React from "react";
import styled from "styled-components";
import ShopCard from "./ShopCard";

const ShopCardContent = ({ data }) => {
  return (
    <CardContent>
      {data !== null &&
        data
          .map((el) => (
            <ShopCard
              key={el.productId}
              id={el.productId}
              title={el.title}
              address={el.address}
              tel={el.tel}
              pcategory={el.pcategory}
              image01={el.image[0]}
            />
          ))
          .slice(0, 8)}
    </CardContent>
  );
};

export default ShopCardContent;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media ${(props) => props.theme.tabletL} {
    justify-content: center;
  }
`;
