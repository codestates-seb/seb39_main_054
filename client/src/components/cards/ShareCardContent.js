import React from 'react'
import styled from 'styled-components';
import ShareCard from './ShareCard';

const ShareCardContent = ({data, number}) => {
  return (
    <CardContent>
    {data !== null && data.map((el) => (
      <ShareCard
        id={el.productId}
        title={el.title}
        content={el.description}
        status={el.status}
        image01={el.image.image01}
      />
    )).slice(0, number)}
  </CardContent>
  )
}

export default ShareCardContent

const CardContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
