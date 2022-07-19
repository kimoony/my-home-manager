import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from 'routes/Home';
import ItemPost from 'routes/ItemPost';
import ItemDetailed from 'routes/ItemDetailed';
import WishPost from 'routes/WishPost';
import Profile from 'routes/Profile';

function AppRouter({ userObj, refreshUser, getItems, setGetItems }) {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home userObj={userObj} getItems={getItems} setGetItems={setGetItems} />} />
        <Route path="item-post" element={<ItemPost userObj={userObj} />} />
        <Route path="item-detailed/:{id}" element={<ItemDetailed userObj={userObj} getItems={getItems} setGetItems={setGetItems} />} />
        <Route path="wish-post" element={<WishPost userObj={userObj} />} />
        <Route path="profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRouter;