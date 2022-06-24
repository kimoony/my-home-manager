import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { loginState } from '../../atoms';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";


function AlarmList() {
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
    <>
      {isLogIn ? (
        getItems.map((it) => (
          <div key={it.id}>
            {
              it.quantity <= 3 ?
                `${it.name}가 ${it.quantity}개 남았습니다. `
                : ""
            }
          </div>
        ))
      ) : null
      }
    </>
  )
}

export default AlarmList