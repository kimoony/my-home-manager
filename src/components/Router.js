import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { db } from "../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import Home from "routes/Home";
import ItemPost from "routes/ItemPost";
import ItemDetailed from "routes/ItemDetail";
import WishPost from "routes/WishPost";
import MyPage from "routes/MyPage";
import WishDetailed from "routes/WishDetail";
import EditWish from "./form/EditWish";
import EditItem from "./form/EditItem";
import { useRecoilState } from "recoil";
import { changedState } from "atoms";

function AppRouter({ userObj, refreshUser }) {
  const [getItems, setGetItems] = useState([]);
  const [getWish, setGetWish] = useState([]);
  const [changed, setChanged] = useRecoilState(changedState);
  // const [updateWish, setUpdateWidh] = useState([]);

  useEffect(() => {
    const getItemData = async () => {
      const data = await getDocs(collection(db, "items"));
      setGetItems(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getItemData();
    setChanged(false);
  }, [changed]);

  useEffect(() => {
    const getWishData = async () => {
      const data = await getDocs(collection(db, "wishItems"));
      setGetWish(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getWishData();
    setChanged(false);
  }, [changed]);

  // update
  const updateWishItems = async (id) => {
    const wishDoc = doc(db, "wishItems", id);
    const newWish = getWish;
    await updateDoc(wishDoc, newWish);
    setChanged(true);
  };

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              userObj={userObj}
              getItems={getItems}
              getWish={getWish}
              changed={changed}
              setChanged={setChanged}
            />
          }
        />
        <Route path="item-post" element={<ItemPost userObj={userObj} />} />
        <Route
          path="item-detail/:id"
          element={<ItemDetailed getItems={getItems} />}
        />
        <Route
          path="item-detail/:id/edit"
          element={<EditItem getItems={getItems} userObj={userObj} />}
        />
        <Route path="wish-post" element={<WishPost userObj={userObj} />} />
        <Route
          path="wish-detail/:id"
          element={<WishDetailed getWish={getWish} />}
        />
        <Route
          path="wish-detail/:id/edit"
          element={<EditWish getWish={getWish} userObj={userObj} />}
        />
        <Route
          path="mypage"
          element={
            <MyPage
              userObj={userObj}
              refreshUser={refreshUser}
              getItems={getItems}
              getWish={getWish}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;
