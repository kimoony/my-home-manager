import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../../atoms';
import { db, storage } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import {
  ListContainer
} from '../../styles/list/ItemList.style';

function List() {
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [getItems, setGetItems] = useState([]);
  const [getImages, setGetImages] = useState();

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

  useEffect((file) => {
    const getImg = async () => {
      const storageRef = ref(storage, 'itemImage')
      const data = await uploadBytes(storageRef, file);
      console.log(data)
      // setGetImages(data);
    }
    getImg();
  }, [])



  return (
    <div>
      {
        isLogIn ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {getItems.map((item) => (
              <ListContainer>
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                  <div>{item.name}</div>
                  <div>{item.quantity}</div>
                  <div>{item.storageLocation}</div>
                  <div>{item.descript}</div>
                  <span>{item.createDate}</span>
                </div>
              </ListContainer >
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <h3>로그인 또는 회원가입 해주세요!</h3>
          </div>
        )
      }
    </div>

  )
}

export default List