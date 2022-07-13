import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { loginState, userObjState } from '../../atoms';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";


function AlarmList() {
  const isLogIn = useRecoilValue(loginState);
  const userObj = useRecoilValue(userObjState);
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