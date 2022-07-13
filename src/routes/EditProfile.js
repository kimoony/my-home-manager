import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../firebase';
import { updateProfile, updatePassword } from "firebase/auth";
import { useRecoilValue } from 'recoil';
import { userObjState } from 'atoms';
// import { useRecoilValue } from 'recoil';
// import { userState } from 'atoms';

const user = authService.currentUser;
// const newPassword = getASecureRandomPassword();

function EditProfile() {
  const navigate = useNavigate();

  const userObj = useRecoilValue(userObjState);
  console.log(userObj)
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const changeNickname = (e) => {
    setNewDisplayName(e.target.value)
  }

  const updatePr = async (e) => {
    e.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(user, {
        displayName: newDisplayName,
      });
      // refreshUser();
      navigate('profile')
      alert("수정완료!")
    }
  }


  return (
    <div>
      <div>
        <label>아이디: </label>
        <span>{user.email}</span>
      </div>
      <div>
        <label>닉네임: </label>
        <span>
          <input
            type="text"
            placeholder="닉네임을 입력하세요!"
            value={newDisplayName}
            onChange={changeNickname}
            maxLength="6"
          />
        </span>
      </div>
      <Link to='profile'>
        <button>뒤로가기</button>
      </Link>
      <button onClick={updatePr}>수정완료</button>
    </div>
  )
}

export default EditProfile