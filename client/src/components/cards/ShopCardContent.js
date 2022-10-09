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
              key={el.storeId}
              id={el.storeId}
              title={el.title}
              address={el.address}
              tel={el.phoneNumber}
              scategory={el.scategory.scategoryName}
              image01={el.simageList}
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
  margin-top: 2rem;

  @media ${(props) => props.theme.tabletL} {
    justify-content: center;
  }
`;
