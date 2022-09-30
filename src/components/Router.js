import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Home = lazy(() => import("routes/Home"));
const WishPost = lazy(() => import("routes/WishPost"));
const ItemPost = lazy(() => import("routes/ItemPost"));
const ItemDetailed = lazy(() => import("routes/ItemDetail"));
const MyPage = lazy(() => import("routes/MyPage"));
const WishDetailed = lazy(() => import("routes/WishDetail"));

function AppRouter({ userObj, refreshUser }) {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="item-post" element={<ItemPost userObj={userObj} />} />
        <Route path="wish-post" element={<WishPost userObj={userObj} />} />
        <Route path="item-detail/:id" element={<ItemDetailed />} />
        <Route path="wish-detail/:id" element={<WishDetailed />} />
        <Route
          path="mypage"
          element={<MyPage userObj={userObj} refreshUser={refreshUser} />}
        />
        <Route path="/" element={<Home userObj={userObj} />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
