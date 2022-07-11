import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { loginState } from '../../atoms';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import {
  ListContainer
} from '../../styles/list/WishList.style';


function WishList() {
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [getWish, setGetWish] = useState([])


  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collection(db, "wishItems"));
      setGetWish(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      })))
    }
    getData()
  }, [])

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {isLogIn ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {getWish.map((item) => (
            <ListContainer>
              <div key={item.id}>
                <div>{item.name}</div>
                <div>{item.categ}</div>
                <div>{item.price}</div>
                <div>{item.descript}</div>
                <div>{item.createDate}</div>
              </div>
            </ListContainer>
          ))}
        </div>) : null}
    </div>
  )
}

export default WishList