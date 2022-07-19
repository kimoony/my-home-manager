import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../atoms';
import { authService, db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import {
  ListContainer
} from '../../styles/list/ItemList.style';
import { Link, useParams } from 'react-router-dom';

function List({ userObj }) {
  const user = authService.currentUser;

  const isLogIn = useRecoilValue(loginState);
  const [getItems, setGetItems] = useState([]);

  const { id } = useParams();

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
    <div>
      {
        isLogIn ? (
          <Link to="item-detailed/:id">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {getItems.map((item) => (
                userObj.uid === item.creatorId ? (
                  <ListContainer key={item.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <div>{item.name}</div>
                      <div>{item.quantity}</div>
                      <div>{item.storageLocation}</div>
                      <div>{item.descript}</div>
                      <span>{item.createDate}</span>
                    </div>
                  </ListContainer >
                ) : null
              ))}
            </div>
          </Link>
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