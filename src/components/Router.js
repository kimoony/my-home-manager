import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { db } from "../firebase";
import Home from "routes/Home";
import ItemPost from "routes/ItemPost";
import ItemDetailed from "routes/ItemDetail";
import WishPost from "routes/WishPost";
import MyPage from "routes/MyPage";
import WishDetailed from "routes/WishDetail";

function AppRouter({ userObj, refreshUser }) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home userObj={userObj} />} />
        <Route path="item-post" element={<ItemPost userObj={userObj} />} />
        <Route path="item-detail/:id" element={<ItemDetailed />} />
        <Route path="wish-post" element={<WishPost userObj={userObj} />} />
        <Route path="wish-detail/:id" element={<WishDetailed />} />
        <Route
          path="mypage"
          element={<MyPage userObj={userObj} refreshUser={refreshUser} />}
        />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
