import React from "react";
import styled from "styled-components";

import ShareState from "../../components/filters/shareState/ShareState";
import MyPageHeader from "./MyPageHeader";
import MyPageContent from "./MyPageContent";

const MyPageFavorite = () => {
  return (
    <>
      <MFContainer>
        <MyPageHeader />
        <ShareStateContainer>
          <ShareState />
        </ShareStateContainer>
        <MyPageContent />
      </MFContainer>
    </>
  );
};

export default MyPageFavorite;

const MFContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
`;

const ShareStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
