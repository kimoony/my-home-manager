import React from 'react'
import { HashRouter, Routes, Route, } from 'react-router-dom'
import Home from '../routes/Home'
import Profile from '../routes/Profile'
import EditProfile from '../routes/EditProfile'

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit" element={<EditProfile />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRouter