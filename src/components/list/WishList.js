import React, { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { getWishState, loginState, modalState } from "../../atoms";
import { ListContainer } from "../../styles/list/WishList.style";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import GetWish from "./GetWish";

function WishList({ userObj }) {
  const isLogIn = useRecoilValue(loginState);
  // const setOnModal = useRecoilState(modalState);
  const [targetId, setTargetId] = useState({});
  const [getWish, setGetWish] = useRecoilState(getWishState);

  // console.log(getWish);

  // const isLogedInWish = () => {
  //   if (isLogIn) {
  //     navigate("/wish-post");
  //   } else {
  //     setOnModal(true);
  //   }
  // };

  useEffect(() => {
    if (getWish.length > 0) {
      const targetWish = getWish.find((item) => item.id);
      if (targetWish) {
        setTargetId(targetWish);
      }
    }
  }, [getWish]);

  const onClickDelete = async () => {
    const delWish = doc(db, "wishItems", targetId.id);
    await deleteDoc(delWish);
    setGetWish(getWish.filter((wish) => wish.id !== targetId.id));
    alert("삭제완료!");
  };

  return (
    <div style={{ height: "95%", overflow: "auto" }}>
      {isLogIn ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "60px",
          }}
        >
          {getWish.length > 0
            ? getWish.map((wish) =>
                userObj.uid === wish.creatorId ? (
                  <GetWish
                    key={wish.id}
                    wish={wish}
                    onClickDelete={onClickDelete}
                  />
                ) : null
              )
            : null}
        </div>
      ) : null}
    </div>
  );
}

export default WishList;
