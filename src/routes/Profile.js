import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../firebase';
import { updateProfile } from "firebase/auth";


function Profile({ refreshUser, userObj }) {
  const user = authService.currentUser;
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onChange = (e) => {
    setNewDisplayName(e.target.value)
  }
  console.log(userObj)

  const updateSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(user, {
        displayName: newDisplayName
      })
      refreshUser()
      alert("수정완료! 홈으로 이동~")
      navigate('/')
    }
  }

  return (
    <>
      <div>
        <label>아이디: </label>
        <span>{userObj.email}</span>
      </div>
      <form onSubmit={updateSubmit}>
        <label>닉네임: </label>
        <span>
          <input
            type="text"
            placeholder="닉네임을 입력하세요!"
            value={newDisplayName}
            onChange={onChange}
            maxLength="8"
          />
        </span>
        <button>프로필 업데이트</button>
      </form>
      <Link to='/'>
        <button>뒤로가기</button>
      </Link>
    </>
  )
}

export default Profile