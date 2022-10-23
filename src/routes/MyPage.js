import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getItemsState, getWishState } from "atoms";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "components/mypage/Header";
import UserInfo from "components/mypage/UserInfo";
import UserList from "components/mypage/UserList";

function MyPage({ refreshUser, userObj }) {
  const getItems = useRecoilValue(getItemsState);
  const getWish = useRecoilValue(getWishState);

  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  return (
    <Wrapper>
      <Header
        showUserInfo={showUserInfo}
        clickUserInfo={setShowUserInfo}
        showUserList={showUserList}
        clickUserList={setShowUserList}
      />
      <UserContent>
        {showUserInfo === false ? null : (
          <UserInfo userObj={userObj} refreshUser={refreshUser} />
        )}
        {showUserList === false ? null : (
          <UserList userObj={userObj} getItems={getItems} getWish={getWish} />
        )}
      </UserContent>
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

const UserContent = styled.div`
  width: 370px;
  height: 150px;
  display: flex;
  flex-direction: column;
`;

const GoBack = styled.button`
  border: none;
  border-radius: 5px;
  font-size: 18px;
  padding: 5px 15px;
  margin-top: 50px;
  background-color: #616365;
  color: #fff;
  cursor: pointer;

  :hover {
    background-color: #667078;
  }
`;
