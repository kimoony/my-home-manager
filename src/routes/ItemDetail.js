import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useParams, Link, useNavigate } from "react-router-dom";
import Item from "components/content/Item";
import { getItemsState } from "atoms";
import { useRecoilState } from "recoil";

function ItemDetailed() {
  const [getImages, setGetImages] = useState();
  const [targetId, setTargetId] = useState({});
  const [getItems, setGetItems] = useRecoilState(getItemsState);
  const [isEdit, setIsEdit] = useState(false);

  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (getItems.length > 0) {
      const targetItem = getItems.find((item) => item.id === id);
      console.log(targetItem);
      if (targetItem) {
        setTargetId(targetItem);
      }
    }
  }, [getItems, id]);

  useEffect((file) => {
    const getImg = async () => {
      const storageRef = ref(storage, "itemImage");
      const data = await uploadBytes(storageRef, file);
      setGetImages(data);
    };
    getImg();
  }, []);

  const onUpdateItem = async (e) => {
    e.preventDefault();
    const editRef = doc(db, "items", targetId.id);
    try {
      await updateDoc(editRef, {
        ...targetId,
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

  const onDeleteItem = async (id) => {
    const delItem = doc(db, "items", targetId.id);
    await deleteDoc(delItem);
    setGetItems(getItems.filter((item) => item.id !== targetId.id));
    alert("삭제완료!");
    navigate("/");
  };

  return (
    <div>
      <Link to="/">
        <button>←</button>
      </Link>
      <Item
        item={targetId}
        setItem={setTargetId}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      {isEdit === false ? (
        <button onClick={() => setIsEdit(true)}>수정</button>
      ) : (
        <button onClick={onUpdateItem}>완료</button>
      )}
      <button onClick={onDeleteItem}>삭제</button>
    </div>
  );
}

export default ItemDetailed;
