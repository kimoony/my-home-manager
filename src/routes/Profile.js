import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { authService } from '../firebase';
import { updateProfile, updatePassword, onAuthStateChanged } from "firebase/auth";
import { useRecoilValue } from 'recoil';
import { userObjState } from 'atoms';
// import { useRecoilValue } from 'recoil';
// import { userState } from 'atoms';

const user = authService.currentUser;
// const newPassword = getASecureRandomPassword();

function Profile() {

  const userObj = useRecoilValue(userObjState);
  console.log(userObj)
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const changeNickname = (e) => {
    setNewDisplayName(e.target.value)
  }

  const updateNickname = async (e) => {
    e.preventDefault()
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(user, {
        displayName: newDisplayName,
      });
      // refreshUser();
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
          <span>{user.displayName} 님</span>
          {/* <button onClick={() => myProfile}>수정</button> */}
        </span>

      </div>
      <Link to='/'>
        <button>뒤로가기</button>
      </Link>
      <Link to='edit-profile'>
        <button>정보수정</button>
      </Link>
    </div>
  )
}

export default Profile