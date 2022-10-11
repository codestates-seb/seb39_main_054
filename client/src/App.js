import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/actions/logInAction";
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
import MyPageIndex from "./pages/myPage/MyPageIndex";
import MyPageEdit from "./pages/myPage/myPageEdit/MyPageEdit";
import Footer from "./components/footer";
import ChatList from "./pages/chat/chatList/ChatList";
import ChatDetail from "./pages/chat/chatDetail/ChatDetail";
import ShopPost from "./pages/shop/shopPost/ShopPost";
import ShopList from "./pages/shop/shopList/ShopList";
import ShareEdit from "./pages/share/shareEdit/ShareEdit";
import ShopEdit from "./pages/shop/shopEdit/ShopEdit";

const App = () => {
  // 테마 변경 (lightTheme, darkTheme)
  const [isTheme, setIsTheme] = useState("light");
  const theme = isTheme === "light" ? lightTheme : darkTheme;
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("authorization") !== null) {
      dispatch(loginSuccess());
    }
  }, []);

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
              <Route path="/share/edit/:id" element={<ShareEdit />}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/signup" element={<SignUp></SignUp>}></Route>
              <Route
                path="/mypage/favorite"
                element={<MyPageIndex></MyPageIndex>}
              ></Route>
              <Route
                path="/mypage/mypost"
                element={<MyPageIndex></MyPageIndex>}
              ></Route>
              <Route
                path="/mypage/edit/:id"
                element={<MyPageEdit></MyPageEdit>}
              ></Route>
              <Route
                path="/mypage/signout"
                element={<MyPageIndex></MyPageIndex>}
              ></Route>
              <Route path="/shop/list" element={<ShopList></ShopList>}></Route>
              <Route
                path="/shop/detail/:id"
                element={<ShopDetail></ShopDetail>}
              ></Route>
              <Route path="/shop/post" element={<ShopPost></ShopPost>}></Route>
              <Route
                path="/shop/edit/:id"
                element={<ShopEdit></ShopEdit>}
              ></Route>
              {/* id: 로그인 유저 */}
              <Route
                path="/chat/list/:id"
                element={<ChatList></ChatList>}
              ></Route>
              {/* id: 상대방 id query &myid = =dsadsa &otherid*/}
              <Route
                path="/chat/detail/:id"
                element={<ChatDetail></ChatDetail>}
              ></Route>
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
