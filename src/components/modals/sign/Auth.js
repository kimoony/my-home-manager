import React from 'react';
import { authService } from '../../../firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab)

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
    console.log(user)
    closeModal();
    setIsLogIn(true);
    alert("로그인 완료!")
  }

  return (
    <div className="auth-container">
      <div className='social_login-box'>
        <button className='btn google-btn' name="google" onClick={onSocialClicik}>
          <FontAwesomeIcon icon={["fab", "google"]} /> Google 로그인
        </button>
        {/* <button className='btn github-btn' name="github" onClick={onSocialClicik}>
          <FontAwesomeIcon icon={["fab", "github"]} /> GitHub 로그인
        </button> */}
      </div>
    </div>
  )
}

export default Auth
