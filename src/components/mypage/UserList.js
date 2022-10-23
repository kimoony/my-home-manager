import React from "react";
import styled from "styled-components";

function UserList({ userObj, getItems, getWish }) {
  return (
    <>
      <UserRegisterList>
        <h3>{userObj.displayName} 등록 리스트</h3>
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
    </>
  );
}

export default UserList;

const UserRegisterList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
