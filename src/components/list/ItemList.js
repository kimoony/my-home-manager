import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getItemsState, loginState, modalState } from "../../atoms";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { ListContainer } from "../../styles/list/ItemList.style";
import { useNavigate } from "react-router-dom";

function ItemList({ userObj }) {
  const isLogIn = useRecoilValue(loginState);
  const setOnModal = useRecoilState(modalState);
  const [targetId, setTargetId] = useState({});
  const [getItems, setGetItems] = useRecoilState(getItemsState);

  const navigate = useNavigate();

  // id filter
  useEffect(() => {
    if (getItems.length > 0) {
      const targetItem = getItems.find((item) => item.id);

      if (targetItem) {
        setTargetId(targetItem);
      }
    }
  }, [getItems]);

  const onDelete = async () => {
    const delItem = doc(db, "items", targetId.id);
    await deleteDoc(delItem);
    setGetItems(getItems.filter((item) => item.id !== targetId.id));
    alert("삭제완료!");
  };

  const isLogedInPost = () => {
    if (isLogIn) {
      navigate("/item-post");
    } else {
      setOnModal(true);
    }
  };

  return (
    <div style={{ height: "95%", overflow: "auto" }}>
      {isLogIn ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "300px",
          }}
        >
          {getItems.length > 0 ? (
            getItems.map((item) =>
              userObj.uid === item.creatorId ? (
                <ListContainer key={item.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div onClick={() => navigate(`item-detail/${item.id}`)}>
                      {item.products}
                    </div>
                    <span>{item.quantity}</span>
                    <span>{item.createDate}</span>
                  </div>
                  <div>
                    <button onClick={onDelete}>삭제</button>
                    <button
                      onClick={() => navigate(`/item-detail/${item.id}/edit`)}
                    >
                      수정
                    </button>
                  </div>
                </ListContainer>
              ) : null
            )
          ) : (
            <button onClick={isLogedInPost}>등록하기</button>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <h3>로그인 또는 회원가입 해주세요!</h3>
        </div>
      )}
    </div>
  );
}

export default ItemList;
