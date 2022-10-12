import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Nickname = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 20px;
`;

const SignBtn = styled.button`
  float: right;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  padding: 5px 10px;
  color: #fff;

  &:first-child {
    margin-right: 30px;
    background-color: #d04f4b;

    :hover {
      background-color: #ee555b;
    }
  }

  &:last-child {
    margin-right: 10px;
    background-color: #616365;

    :hover {
      background-color: #667078;
    }
  }
`;

function Nav({ isLogIn, userObj, SignOut }) {
  const navigate = useNavigate();
  return (
    <>
      {isLogIn ? (
        <>
          <Nickname>{userObj.displayName}님, 안녕하세요!</Nickname>
          <div>
            <SignBtn onClick={SignOut}>로그아웃</SignBtn>
            <Link to="mypage">
              <SignBtn>마이페이지</SignBtn>
            </Link>
          </div>
        </>
      ) : (
        <SignBtn
          style={{ marginRight: "30px" }}
          onClick={() => navigate("/sign")}
        >
          로그인
        </SignBtn>
      )}
    </>
  );
}

export default Nav;
