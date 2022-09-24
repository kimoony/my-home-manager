import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useParams, Link, useNavigate } from "react-router-dom";
import Item from "components/content/Item";

function ItemDetailed({ getItems }) {
  const [getImages, setGetImages] = useState();
  const [itemId, setItemId] = useState({});

  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (getItems.length > 0) {
      const targetItem = getItems.find((item) => item.id === id);
      console.log(targetItem);
      if (targetItem) {
        setItemId(targetItem);
      }
    }
  }, [getItems, id]);

  // console.log(itemId)

  useEffect((file) => {
    const getImg = async () => {
      const storageRef = ref(storage, "itemImage");
      const data = await uploadBytes(storageRef, file);
      setGetImages(data);
    };
    getImg();
  }, []);

  const onDeleteItem = async (id) => {
    const delItem = doc(db, "items", itemId.id);
    await deleteDoc(delItem);
    alert("삭제완료!");
    navigate("/");
  };

  return (
    <div>
      <Link to="/">
        <button>←</button>
      </Link>
      <Item itemId={itemId} />
      <Link to={`/item-detail/${itemId.id}/edit`}>
        <button>수정</button>
      </Link>
      <button onClick={onDeleteItem}>삭제</button>
    </div>
  );
}

export default ItemDetailed;
