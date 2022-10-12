import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getItemsState, loginState } from "../../atoms";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import styled from "styled-components";
import GetItem from "./GetItem";

function ItemList({ userObj }) {
  const isLogIn = useRecoilValue(loginState);
  const [targetId, setTargetId] = useState({});
  const [getItems, setGetItems] = useRecoilState(getItemsState);

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
    alert(`${targetId.products} 삭제완료!`);
  };

  return (
    <Container>
      {isLogIn ? (
        <ListBox>
          {getItems.length > 0 ? (
            getItems.map((item) =>
              userObj.uid === item.creatorId ? (
                <GetItem key={item.id} item={item} onDelete={onDelete} />
              ) : null
            )
          ) : (
            <p>아이템을 등록해 주세요!</p>
          )}
        </ListBox>
      ) : (
        <SignGo>
          <h3>로그인 또는 회원가입 해주세요!</h3>
        </SignGo>
      )}
    </Container>
  );
}

export default ItemList;

const Container = styled.section`
  height: 95%;
  overflow: auto;
`;

const ListBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
`;

const SignGo = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
