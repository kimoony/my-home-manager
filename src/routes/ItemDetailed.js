import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useParams } from 'react-router-dom';

function ItemDetailed({ userObj, getItems, setGetItems }) {
  const [getImages, setGetImages] = useState();


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

  useEffect((file) => {
    const getImg = async () => {
      const storageRef = ref(storage, 'itemImage')
      const data = await uploadBytes(storageRef, file);
      console.log(data)
      setGetImages(data);
    }
    getImg();
  }, [])


  return (
    <div>
      {
        getItems.map((item) => (
          userObj.uid === item.creatorId ? (
            <div>
              <h1>상세페이지</h1>
              <p>등록시간: {item.createDate}</p>
              {/* <img src="" alt="" /> */}
              <div>
                <label>카테고리: </label>
                <span>{item.categ}</span>
              </div>
              <div>
                <label>물품명: </label>
                <span>{item.name}</span>
              </div>
              <div>
                <label>수량: </label>
                <span>{item.quantity}</span>
              </div>
              <div>
                <label>보관위치: </label>
                <span>{item.storageLocation}</span>
              </div>
              <div>
                <label>구매처/구매방법: </label>
                <span>{item.purchase} / {item.pMethod}</span>
              </div>
              <div>
                <label>설명: </label>
                <span>{item.descript}</span>
              </div>
            </div>
          ) : null
        ))
      }
    </div>
  )
}

export default ItemDetailed