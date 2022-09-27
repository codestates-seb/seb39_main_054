import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyle from "./assets/styles/GlobalStyle";
import { darkTheme, lightTheme } from "./assets/styles/Theme";
import Nav from "./components/nav/Nav";
import Main from "./pages/main/Main";
import ShareDetail from "./pages/share/shareDetail/ShareDetail";
import Login from "./pages/register/login/Login";
import SignUp from "./pages/register/signUp/SignUp";
import ShareList from "./pages/share/shareList/ShareList";
import SharePost from "./pages/share/sharePost/SharePost";
import ShopDetail from "./pages/shop/shopDetail/ShopDetail";
import MyPageFavorite from "./pages/myPage/MyPageFavorite";
import MyPageMyPost from "./pages/myPage/MyPageMyPost";
import MyPageEdit from "./pages/myPage/MyPageEdit";
import MyPageSignOut from "./pages/myPage/MyPageSignOut";
import Footer from "./components/footer";

const App = () => {
  // 테마 변경 (lightTheme, darkTheme)
  const [isTheme, setIsTheme] = useState("light");
  const theme = isTheme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      setIsTheme("light");
    } else {
      setIsTheme("dark");
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppContainer>
          <Router>
            <Nav isTheme={isTheme} setIsTheme={setIsTheme} />
            <Routes>
              {/* 메인 */}
              <Route path="/" element={<Main></Main>}></Route>
              <Route
                path="/share/list"
                element={<ShareList></ShareList>}
              ></Route>
              <Route path="/share/detail/:id" element={<ShareDetail />}></Route>
              <Route path="/share/post" element={<SharePost />}></Route>
              <Route path="/share/edit/:id"></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/signup" element={<SignUp></SignUp>}></Route>
              <Route
                path="/mypage/favorite"
                element={<MyPageFavorite></MyPageFavorite>}
              ></Route>
              <Route
                path="/mypage/mypost"
                element={<MyPageMyPost></MyPageMyPost>}
              ></Route>
              <Route
                path="/mypage/edit"
                element={<MyPageEdit></MyPageEdit>}
              ></Route>
              <Route
                path="/mypage/signout"
                element={<MyPageSignOut></MyPageSignOut>}
              ></Route>
              <Route path="/shop/list"></Route>
              <Route
                path="/shop/detail/:id"
                element={<ShopDetail></ShopDetail>}
              ></Route>
              <Route path="/shop/post"></Route>
              <Route path="/shop/edit"></Route>
              {/* id: 로그인 유저 */}
              <Route path="/chat/list/:id"></Route>
              {/* id: 상대방 id query &myid = =dsadsa &otherid*/}
              <Route path="/chat/detail/:id"></Route>
            </Routes>
            <Footer />
          </Router>
        </AppContainer>
      </ThemeProvider>
    </>
  );
};

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
