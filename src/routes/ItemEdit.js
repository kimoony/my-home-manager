import { getItemsState } from "atoms";
import { db, storage } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import ItemEditForm from "components/form/editInput/ItemEditForm";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function ItemEdit() {
  const [targetId, setTargetId] = useState({});
  const [getItems, setGetItems] = useRecoilState(getItemsState);

  const [itemCategValue, setItemCategValue] = useState(targetId.category);
  const [methodCategValue, setMethodCategValue] = useState(
    targetId.purchaseMethod
  );

  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [percent, setPercent] = useState(0);

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
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgUrl(url);
          });
        }
      );

      if (percent === 100) {
        await updateDoc(editRef, {
          ...targetId,
          category: itemCategValue,
          purchaseMethod: methodCategValue,
          productsImg: imgUrl,
        });
        console.log(editRef.id);

        alert("수정이 완료되었습니다.");
        navigate(`/item-detail/${targetId.id}`);
      }
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
          setFile={setFile}
        />
      </form>
    </div>
  );
}

export default ItemEdit;
