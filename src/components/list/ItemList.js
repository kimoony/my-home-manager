import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState, nowTime } from '../../atoms';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";

function List() {
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [getItems, setGetItems] = useState([])

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collection(db, "items"));
      setGetItems(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })))
    }
    getData()
  }, [])

  return (
    <div
    // style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%" }}
    >
      {
        isLogIn ? (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", width: "100%", height: "100%" }}>
            {getItems.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <div>{item.name}</div>
                <div>{item.quantity}</div>
                <div>{item.storageLocation}</div>
                <div>{item.descript}</div>
                <span>{item.createDate}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <h3>로그인 또는 회원가입 해주세요!</h3>
          </div>
        )
      }
    </div >

  )
}

export default List