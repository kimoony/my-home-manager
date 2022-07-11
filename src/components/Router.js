import React from 'react';
import { HashRouter, Routes, Route, } from 'react-router-dom';
import Home from 'routes/Home';
import ItemPost from 'routes/ItemPost';
import WishPost from 'routes/WishPost';
import Profile from 'routes/Profile';
import EditProfile from 'routes/EditProfile';

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="item-post" element={<ItemPost />} />
        <Route path="wish-post" element={<WishPost />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit-profile" element={<EditProfile />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRouter;