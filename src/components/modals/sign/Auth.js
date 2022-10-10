import React from "react";
import { authService } from "../../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Google = styled.button`
  background-color: #d04f4b;
  color: #fff;
  font-size: 1.2rem;
  height: 2rem;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;

  :hover {
    background-color: #ee555b;
  }
`;

library.add(fab);

function Auth({ closeModal, setIsLogIn }) {
  const onSocialClicik = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    //  else if (name === "github") {
    //   provider = new GithubAuthProvider();
    // }
    const user = await signInWithPopup(authService, provider);
    console.log(user);
    closeModal();
    setIsLogIn(true);
    alert("로그인 완료!");
  };

  return (
    <Wrapper>
      <Google>
        <buttGoogleon name="google" onClick={onSocialClicik}>
          <FontAwesomeIcon icon={["fab", "google"]} /> Google 로그인
        </buttGoogleon>
      </Google>
    </Wrapper>
  );
}

export default Auth;
