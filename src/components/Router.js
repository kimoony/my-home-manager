import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore";
import Home from 'routes/Home';
import ItemPost from 'routes/ItemPost';
import ItemDetailed from 'routes/ItemDetailed';
import WishPost from 'routes/WishPost';
import Profile from 'routes/Profile';

function AppRouter({ userObj, refreshUser }) {
  const [getItems, setGetItems] = useState([]);

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


  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home userObj={userObj} getItems={getItems} />} />
        <Route path="item-post" element={<ItemPost userObj={userObj} />} />
        <Route path="item-detail/:id" element={<ItemDetailed userObj={userObj} getItems={getItems} />} />
        <Route path="wish-post" element={<WishPost userObj={userObj} />} />
        <Route path="profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRouter;