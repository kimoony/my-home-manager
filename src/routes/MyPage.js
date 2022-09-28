import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../firebase";
import { updateProfile } from "firebase/auth";
import { getItemsState, getWishState } from "atoms";
import { useRecoilValue } from "recoil";

function MyPage({ refreshUser, userObj }) {
  const user = authService.currentUser;
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const getItems = useRecoilValue(getItemsState);
  const getWish = useRecoilValue(getWishState);

  const onChange = (e) => {
    setNewDisplayName(e.target.value);
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(user, {
        displayName: newDisplayName,
      });
      refreshUser();
      alert("수정완료! 홈으로 이동~");
      navigate("/");
    }
  };

  return (
    <>
      <h1>마이페이지</h1>
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
        <button>닉네임 변경</button>
      </form>
      <div>
        <h3>{userObj.displayName} 등록 현황</h3>
        <h5>아이템: {getItems.length}개</h5>
        <h5>위시: {getWish.length}개</h5>
        <div>
          <h5>알림</h5>
          {getItems.map((it) =>
            userObj.uid === it.creatorId ? (
              <div key={it.id}>
                {it.quantity <= 3
                  ? `${it.name}가 ${it.quantity}개 남았습니다. `
                  : ""}
              </div>
            ) : null
          )}
        </div>
      </div>
      <Link to="/">
        <button>뒤로가기</button>
      </Link>
    </>
  );
}

export default MyPage;
