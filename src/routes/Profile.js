import React from 'react'
import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <div>
        <label>아이디</label>
        <div>-</div>
      </div>
      <div>
        <label>닉네임</label>
        <div>--</div>
      </div>
      <div>
        <label>비밀번호</label>
        <div>******</div>
      </div>
      <Link to='/'>
        <button>뒤로가기</button>
      </Link>
      <Link to='edit-profile'>
        <button>수정하기</button>
      </Link>
    </div>
  )
}

export default Profile