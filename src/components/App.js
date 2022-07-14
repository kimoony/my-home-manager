import AppRouter from "./Router";
import { createGlobalStyle } from 'styled-components';
import { useEffect, useState } from "react";
import { authService } from "../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

// const GlobalStyled = createGlobalStyle`
// /* 글자 폰드 import */
// /* @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,400;1,300&display=swap'); */

// // reset.css
// html, body, div, span, applet, object, iframe,
// h1, h2, h3, h4, h5, h6, p, blockquote, pre,
// a, abbr, acronym, address, big, cite, code,
// del, dfn, em, img, ins, kbd, q, s, samp,
// small, strike, strong, sub, sup, tt, var,
// b, u, i, center,
// dl, dt, dd, menu, ol, ul, li,
// fieldset, form, label, legend,
// table, caption, tbody, tfoot, thead, tr, th, td,
// article, aside, canvas, details, embed,
// figure, figcaption, footer, header, hgroup,
// main, menu, nav, output, ruby, section, summary,
// time, mark, audio, video {
//   margin: 0;
//   padding: 0;
//   border: 0;
//   font-size: 100%;
//   font: inherit;
//   vertical-align: baseline;
// }
// /* HTML5 display-role reset for older browsers */
// article, aside, details, figcaption, figure,
// footer, header, hgroup, main, menu, nav, section {
//   display: block;
// }
// /* HTML5 hidden-attribute fix for newer browsers */
// *[hidden] {
//     display: none;
// }
// body {
//   line-height: 1;
// }
// menu, ol, ul {
//   list-style: none;
// }
// blockquote, q {
//   quotes: none;
// }
// blockquote:before, blockquote:after,
// q:before, q:after {
//   content: '';
//   content: none;
// }
// table {
//   border-collapse: collapse;
//   border-spacing: 0;
// }
// * {
//   box-sizing: border-box;
// }
// body {
//   /* font-family: 'Ubuntu', sans-serif; */
// }
// a {
//   text-decoration: none;
//   color: inherit;
// }
// `;



function App() {
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(args),
    });
  }

  return (
    // <GlobalStyled>
    <AppRouter userObj={userObj} refreshUser={refreshUser} />
    /* </GlobalStyled> */
  );
}

export default App;
