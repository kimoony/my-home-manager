import React from 'react';
import { authService } from '../../firebase';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab)

function Auth() {

  const onSocialClicik = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "facebook") {
      provider = new FacebookAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }

  return (
    <div className="auth-container">
      <div className='social_login-box'>
        <button className='btn google-btn' name="google" onClick={onSocialClicik}>
          <FontAwesomeIcon icon={["fab", "google"]} /> Google 로그인
        </button>
        <button className='btn github-btn' name="facebook" onClick={onSocialClicik}>
          <FontAwesomeIcon icon={["fab", "facebook"]} /> Facebook 로그인
        </button>
      </div>
    </div>
  )
}

export default Auth
