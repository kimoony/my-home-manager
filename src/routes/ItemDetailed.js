import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useParams } from 'react-router-dom';

function ItemDetailed({ userObj, getItems, searchId }) {
  const [getImages, setGetImages] = useState();


  useEffect((file) => {
    const getImg = async () => {
      const storageRef = ref(storage, 'itemImage')
      const data = await uploadBytes(storageRef, file);
      // console.log(data)
      setGetImages(data);
    }
    getImg();
  }, [])

  const onDelete = () => {
    const delItem = deleteDoc(doc(db, "items"))
    alert("삭제완료!")
    console.log(delItem)
  }


  return (
    <div>
      {
        getItems.map((item) => (
          userObj.uid === item.creatorId &&
            searchId.id === item.id ? (
            <div key={item.id}>
              <h1>상세페이지</h1>
              <div>{item.id}</div>
              <p>등록시간: {item.createDate}</p>
              {/* <h3>`이 게시물은  번째 입니다.`</h3> */}
              {/* <div>{getImages}</div> */}
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
              <div onClick={onDelete}>삭제</div>
            </div>
          ) : null
        ))
      }
    </div>
  )
}

export default ItemDetailed