import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useParams } from 'react-router-dom';

function ItemDetailed({ userObj, getItems }) {
  const [getImages, setGetImages] = useState();
  const [itemId, setItemId] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (getItems.length > 0) {
      const targetItem = getItems.find((item) => item.id === id)
      console.log(targetItem)
      if (targetItem) {
        setItemId(targetItem)
      }
    }
  }, [getItems, id])

  console.log(itemId)

  useEffect((file) => {
    const getImg = async () => {
      const storageRef = ref(storage, 'itemImage')
      const data = await uploadBytes(storageRef, file);
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
        <div key={itemId.id}>
          <h1>상세페이지</h1>
          <div>{itemId.id}</div>
          <p>등록시간: {itemId.createDate}</p>
          {/* <h3>`이 게시물은  번째 입니다.`</h3> */}
          {/* <div>{getImages}</div> */}
          <div>
            <label>카테고리: </label>
            <span>{itemId.categ}</span>
          </div>
          <div>
            <label>물품명: </label>
            <span>{itemId.name}</span>
          </div>
          <div>
            <label>수량: </label>
            <span>{itemId.quantity}</span>
          </div>
          <div>
            <label>보관위치: </label>
            <span>{itemId.storageLocation}</span>
          </div>
          <div>
            <label>구매처/구매방법: </label>
            <span>{itemId.purchase} / {itemId.pMethod}</span>
          </div>
          <div>
            <label>설명: </label>
            <span>{itemId.descript}</span>
          </div>
          <div onClick={onDelete}>삭제</div>
        </div>
      }
    </div>
  )
}

export default ItemDetailed