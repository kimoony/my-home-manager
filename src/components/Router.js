import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
const Home = lazy(() => import("routes/Home"));
const Sign = lazy(() => import("routes/Sign"));
const WishPost = lazy(() => import("routes/WishPost"));
const ItemPost = lazy(() => import("routes/ItemPost"));
const ItemDetailed = lazy(() => import("routes/ItemDetail"));
const ItemEdit = lazy(() => import("routes/ItemEdit"));
const MyPage = lazy(() => import("routes/MyPage"));
const WishDetailed = lazy(() => import("routes/WishDetail"));

function AppRouter({ userObj, refreshUser }) {
  return (
    <Wrapper>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="item-post" element={<ItemPost userObj={userObj} />} />
          <Route path="wish-post" element={<WishPost userObj={userObj} />} />
          <Route path="item-detail/:id" element={<ItemDetailed />} />
          <Route path="item-detail/:id/edit" element={<ItemEdit />} />
          <Route path="wish-detail/:id" element={<WishDetailed />} />
          <Route
            path="mypage"
            element={<MyPage userObj={userObj} refreshUser={refreshUser} />}
          />
          <Route path="sign" element={<Sign userObj={userObj} />} />
          <Route path="/" element={<Home userObj={userObj} />} />
        </Routes>
      </Suspense>
    </Wrapper>
  );
}

export default AppRouter;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
