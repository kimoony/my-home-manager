import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { loginState } from '../../atoms';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import {
  ListContainer
} from '../../styles/list/WishList.style';
import { useNavigate } from 'react-router-dom';


function WishList({ userObj }) {
  const isLogIn = useRecoilValue(loginState);
  const [currentWish, setCurrentWish] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const getWishData = async () => {
      const data = await getDocs(collection(db, "wishItems"));
      setCurrentWish(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })))
    }
    getWishData();
  }, [])


  return (
    <div style={{ height: "95%", overflow: "auto" }}>
      {
        isLogIn ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "60px" }}>
            {currentWish.length > 0 ? (
              currentWish.map((item) => (
                userObj.uid === item.creatorId ? (
                  <ListContainer key={item.id}>
                    <div
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
                      onClick={() => navigate(`wish-detail/${item.id}`)}
                    >
                      <div>{item.name}</div>
                      <div>{item.price}</div>
                      <span>{item.createDate}</span>
                    </div>
                    <div>
                      <button style={{ marginLeft: "25px", marginRight: "10px" }}>삭제</button>
                      <button>수정</button>
                    </div>
                  </ListContainer>
                ) : null)
              )
            ) : <h3>Wish 아이템을 등록하세요!</h3>}
          </div>) : null
      }
    </div>
  )
}

export default WishList