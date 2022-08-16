import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { loginState } from '../../atoms';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";


function AlarmList({ userObj, getItems }) {
  const isLogIn = useRecoilValue(loginState);

  return (
    <>
      {isLogIn ? (
        getItems.map((it) => (
          userObj.uid === it.creatorId ? (
            <div key={it.id}>
              {
                it.quantity <= 3 ?
                  `${it.name}가 ${it.quantity}개 남았습니다. `
                  : ""
              }
            </div>
          ) : null
        ))
      ) : null
      }
    </>
  )
}

export default AlarmList