import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { loginState } from '../../atoms';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";


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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%" }}>
      {isLogIn ? (<div>
        {getWish.map((item) => (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.categ}</div>
            <div>{item.price}</div>
            <div>{item.descript}</div>
            <div>{item.createDate}</div>
          </div>
        ))}
      </div>) : null}
    </div>
  )
}

export default WishList