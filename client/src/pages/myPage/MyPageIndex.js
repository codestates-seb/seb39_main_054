import React from "react";
import { useLocation } from "react-router-dom";
import MyPageSignOut from "./myPageSignOut/MyPageSignOut";
import MyPageFavorite from "./myPageFavorite/MyPageFavorite";
import MyPageHeader from "./MyPageHeader";
import MyPageMyPost from "./myPageMyPost/MyPageMyPost";

const MyPageIndex = () => {
  const pathname = useLocation().pathname;
  return (
    <>
      <MyPageHeader></MyPageHeader>
      {pathname === "/mypage/favorite" && <MyPageFavorite></MyPageFavorite>}
      {pathname === "/mypage/mypost" && <MyPageMyPost></MyPageMyPost>}
      {pathname === "/mypage/signout" && <MyPageSignOut></MyPageSignOut>}
    </>
  );
};

export default MyPageIndex;
