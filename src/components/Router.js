import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { db } from "../firebase"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import Home from 'routes/Home';
import ItemPost from 'routes/ItemPost';
import ItemDetailed from 'routes/ItemDetailed';
import WishPost from 'routes/WishPost';
import Profile from 'routes/Profile';

function AppRouter({ userObj, refreshUser }) {
  const [getItems, setGetItems] = useState([]);
  const [searchId, setSearchId] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collection(db, "items"));
      setGetItems(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })))
    }
    getData()
  }, [])

  useEffect(() => {
    if (getItems.length > 0) {
      const targetItem = getItems.find((item) => item.id)
      if (targetItem) {
        setSearchId(targetItem)
      }
    }
  }, [getItems])

  console.log(searchId)

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home userObj={userObj} getItems={getItems} searchId={searchId} />} />
        <Route path="item-post" element={<ItemPost userObj={userObj} />} />
        <Route path="item-detail/:id" element={<ItemDetailed userObj={userObj} getItems={getItems} searchId={searchId} />} />
        <Route path="wish-post" element={<WishPost userObj={userObj} />} />
        <Route path="profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRouter;