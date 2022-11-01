import { getItemsState } from "atoms";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import ItemEditForm from "components/form/editInput/ItemEditForm";

function ItemEdit() {
  const [targetId, setTargetId] = useState({});
  const [getItems, setGetItems] = useRecoilState(getItemsState);

  const [itemCategValue, setItemCategValue] = useState(targetId.category);
  const [methodCategValue, setMethodCategValue] = useState(
    targetId.purchaseMethod
  );

  const onChangeICateg = (e) => {
    setItemCategValue(e.target.value);
  };
  const onChangeMCateg = (e) => {
    setMethodCategValue(e.target.value);
  };

  const { id } = useParams();
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

  const onUpdateItem = async (e) => {
    e.preventDefault();
    const editRef = doc(db, "items", targetId.id);
    try {
      await updateDoc(editRef, {
        ...targetId,
        category: itemCategValue,
        purchaseMethod: methodCategValue,
      });
      console.log(editRef.id);

      alert("수정이 완료되었습니다.");
      navigate(`/item-detail/${targetId.id}`);
    } catch (error) {
      console.error(error.message);
    } finally {
      console.log("End");
    }
  };

  return (
    <div>
      <form onSubmit={onUpdateItem}>
        <ItemEditForm
          item={targetId}
          setItem={setTargetId}
          itemCategValue={itemCategValue}
          methodCategValue={methodCategValue}
          onChangeICateg={onChangeICateg}
          onChangeMCateg={onChangeMCateg}
        />
      </form>
    </div>
  );
}

export default ItemEdit;
