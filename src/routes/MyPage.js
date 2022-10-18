import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../firebase";
import { updateProfile } from "firebase/auth";
import { getItemsState, getWishState } from "atoms";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

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
    <Wrapper>
      <PageName>마이페이지</PageName>
      <UserId>
        <label>아이디: </label>
        <span>{userObj.email}</span>
      </UserId>
      <Nickname onSubmit={updateSubmit}>
        <label>닉네임: </label>
        <span>
          <NickInput
            type="text"
            placeholder="닉네임을 입력하세요!"
            value={newDisplayName}
            onChange={onChange}
            maxLength="8"
          />
        </span>
        <button>닉네임 변경</button>
      </Nickname>
      <UserRegisterList>
        <h3>{userObj.displayName} 등록 현황</h3>
        <Items>아이템: {getItems.length}개</Items>
        <Wish>위시: {getWish.length}개</Wish>
        <AlarmList>
          <Alarm>알림</Alarm>
          {getItems.map((it) =>
            userObj.uid === it.creatorId ? (
              <li key={it.id}>
                {it.quantity <= 3
                  ? `${it.name}가 ${it.quantity}개 남았습니다. `
                  : ""}
              </li>
            ) : null
          )}
        </AlarmList>
      </UserRegisterList>
      <Link to="/">
        <GoBack>뒤로가기</GoBack>
      </Link>
    </Wrapper>
  );
}

export default MyPage;

const Wrapper = styled.section`
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  max-height: 80%;
  width: 20rem;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const PageName = styled.h1`
  font-size: 3rem;
`;

const UserId = styled.div`
  align-self: flex-start;
  font-size: 18px;
  font-weight: bold;
`;

const Nickname = styled.form`
  align-self: flex-start;
  font-size: 18px;

  button {
    border: none;
    border-radius: 5px;
    background-color: #616365;
    color: #fff;
    cursor: pointer;

    :hover {
      background-color: #667078;
    }
  }
`;

const NickInput = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  margin-right: 10px;
`;

const UserRegisterList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

const Items = styled.h5`
  margin: 0px;
  font-size: 16px;
`;

const Wish = styled(Items)``;

const AlarmList = styled(UserRegisterList)`
  margin: 0px;
  li {
    font-size: 15px;
  }
`;

const Alarm = styled(Items)``;

const GoBack = styled.button`
  border: none;
  border-radius: 5px;
  font-size: 18px;
  padding: 5px 15px;
  margin-top: 20px;
  background-color: #616365;
  color: #fff;
  cursor: pointer;

  :hover {
    background-color: #667078;
  }
`;
