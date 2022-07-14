import React from 'react';
import { HashRouter, Routes, Route, } from 'react-router-dom';
import Home from 'routes/Home';
import ItemPost from 'routes/ItemPost';
import WishPost from 'routes/WishPost';
import Profile from 'routes/Profile';

function AppRouter({ userObj, refreshUser }) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home userObj={userObj} />} />
        <Route path="item-post" element={<ItemPost userObj={userObj} />} />
        <Route path="wish-post" element={<WishPost userObj={userObj} />} />
        <Route path="profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRouter;