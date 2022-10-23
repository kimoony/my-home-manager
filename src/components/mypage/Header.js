import React from "react";
import styled from "styled-components";

function Header({ showUserInfo, clickUserInfo, showUserList, clickUserList }) {
  const onClickUserInfo = () => {
    if (showUserInfo === false) {
      clickUserInfo(!showUserInfo);
      clickUserList(false);
    } else {
      clickUserInfo(!showUserInfo);
    }
  };

  const onClickUserList = () => {
    if (showUserList === false) {
      clickUserList(!showUserList);
      clickUserInfo(false);
    } else {
      clickUserList(!showUserList);
    }
  };

  return (
    <div>
      <PageName>마이페이지</PageName>
      <MyPageNav>
        <NavName onClick={onClickUserInfo}>회원정보</NavName>
        <NavName onClick={onClickUserList}>등록현황</NavName>
      </MyPageNav>
    </div>
  );
}

export default Header;

const PageName = styled.h1`
  font-size: 3rem;
`;

const MyPageNav = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const NavName = styled.button`
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: #fff;

  :focus {
    border-bottom: 2px solid #cbcdd4;
  }
`;
