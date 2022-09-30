import Wish from "components/content/Wish";
import { db } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getWishState } from "atoms";

function WishDetailed() {
  const [getWish, setGetWish] = useRecoilState(getWishState);
  const [wishId, setWishId] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (getWish.length > 0) {
      const targetWish = getWish.find((item) => item.id === id);
      console.log(targetWish);
      if (targetWish) {
        setWishId(targetWish);
      }
    }
  }, [getWish, id]);

  console.log(getWish, wishId);

  const onUpdateWish = async (e) => {
    e.preventDefault();
    const editRef = doc(db, "wishItems", wishId.id);
    try {
      await updateDoc(editRef, {
        ...wishId,
      });
      console.log(editRef.id);

      setIsEdit(false);
      alert("등록이 완료되었습니다.");
    } catch (error) {
      console.error(error.message);
    } finally {
      console.log("End");
    }
  };

  const onDeleteWish = async (id) => {
    const delWish = doc(db, "wishItems", wishId.id);
    await deleteDoc(delWish);
    setGetWish(getWish.filter((wish) => wish.id !== wishId.id));
    alert("삭제완료!");
    navigate("/");
  };

  return (
    <div>
      <Link to="/">
        <button>←</button>
      </Link>
      <Wish wish={wishId} setWish={setWishId} isEdit={isEdit} />
      {isEdit === false ? (
        <button onClick={() => setIsEdit(true)}>수정</button>
      ) : (
        <button onClick={onUpdateWish}>완료</button>
      )}
      <button onClick={onDeleteWish}>삭제</button>
    </div>
  );
}

export default WishDetailed;
