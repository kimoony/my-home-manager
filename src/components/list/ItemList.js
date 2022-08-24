import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { countQuantity, loginState } from '../../atoms';
import { db } from '../../firebase';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import {
  ListContainer
} from '../../styles/list/ItemList.style';
import { useNavigate, useParams } from 'react-router-dom';

function ItemList({ userObj }) {
  const isLogIn = useRecoilValue(loginState);
  const [quantity, setquantity] = useRecoilState(countQuantity);
  const [targetId, setTargetId] = useState({});
  const [currentItems, setCurrentItems] = useState([])

  const navigate = useNavigate();


  useEffect(() => {
    const getCurrentItems = async () => {
      const data = await getDocs(collection(db, "items"));
      setCurrentItems(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })))
    }
    getCurrentItems();
  }, [currentItems])

  useEffect(() => {
    if (currentItems.length > 0) {
      const targetItem = currentItems.find((item) => item.id)
      console.log(targetItem)
      if (targetItem) {
        setTargetId(targetItem)
      }
    }
  }, [currentItems])


  const onDelete = async () => {
    const delItem = doc(db, "items", targetId.id);
    await deleteDoc(delItem);
    alert("삭제완료!");
  }

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

  return (
    <div style={{ height: "95%", overflow: "auto" }}>
      {
        isLogIn ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "300px" }}>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                userObj.uid === item.creatorId ? (
                  <ListContainer key={item.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                      <div onClick={() => navigate(`item-detail/${item.id}`)}>{item.name}</div>
                      <button onClick={minusQuantity}>-</button>
                      <input value={item.quantity} onChange={quantityChange} />
                      <button onClick={addQuantity}>+</button>
                      <span>{item.createDate}</span>
                    </div>
                    <div>
                      <button onClick={onDelete}>삭제</button>
                      <button>수정</button>
                    </div>
                  </ListContainer >
                ) : null
              )
              )) : <h3>아이템을 등록하세요!</h3>
            }
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

export default ItemList