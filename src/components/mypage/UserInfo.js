import React, { useState } from "react";
import { authService } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function UserInfo({ userObj, refreshUser }) {
  const user = authService.currentUser;
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

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
    </>
  );
}

export default UserInfo;

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
