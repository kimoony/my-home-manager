import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { countQuantity, loginState } from '../../atoms';
import { authService, db } from '../../firebase';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import {
  ListContainer
} from '../../styles/list/ItemList.style';
import { Link, useNavigate, useParams } from 'react-router-dom';

function List({ userObj, getItems, searchId }) {
  const isLogIn = useRecoilValue(loginState);
  const [quantity, setquantity] = useRecoilState(countQuantity);

  const navigate = useNavigate();

  // const onDelete = async () => {
  //   const delItem = await deleteDoc(doc(db, "items", items.id))
  //   alert("삭제완료!")
  //   console.log(delItem)
  // }

  const quantityChange = (e) => {
    setquantity(e.target.value)
  }
  const addQuantity = (e) => {
    setquantity((prev) => Number(prev) + 1)
  }
  const minusQuantity = (e) => {
    if (countQuantity > 0) {
      setquantity((prev) => Number(prev) - 1)
    }
  }

  const goDetail = () => {
    getItems.map((item) => (
      item.id === searchId.id && console.log(`item-detail/${item.id}`)
    ))
  }

  return (
    <div style={{ height: "95%", overflow: "auto" }}>
      {
        isLogIn ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "300px" }}>
            {getItems.map((item) => (
              userObj.uid === item.creatorId ? (
                getItems.length > 0 ? (
                  <ListContainer key={item.id}>
                    <div
                      onClick={goDetail}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
                    >
                      <div>{item.name}</div>
                      <button onClick={minusQuantity}>-</button>
                      <input value={item.quantity} onChange={quantityChange} />
                      <button onClick={addQuantity}>+</button>
                      <span>{item.createDate}</span>
                    </div>
                    <div>
                      <button>수정</button>
                      <button >삭제</button>
                    </div>
                  </ListContainer >
                ) : <h3>아이템을 등록하세요!</h3>
              ) : null
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