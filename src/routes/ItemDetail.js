import React, { useEffect, useState } from 'react'
import { db, storage } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { useParams, Link } from 'react-router-dom';
import CurrentItem from 'components/CurrentItem';

function ItemDetailed({ getItems }) {
  const [getImages, setGetImages] = useState();
  const [itemId, setItemId] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (getItems.length > 0) {
      const targetItem = getItems.find((item) => item.id === id)
      console.log(targetItem)
      if (targetItem) {
        setItemId(targetItem)
      }
    }
  }, [getItems, id])

  // console.log(itemId)

  useEffect((file) => {
    const getImg = async () => {
      const storageRef = ref(storage, 'itemImage')
      const data = await uploadBytes(storageRef, file);
      setGetImages(data);
    }
    getImg();
  }, [])

  const onDelete = () => {
    const delItem = deleteDoc(doc(db, "items", `${itemId.id}`))
    console.log(delItem)
    // alert("삭제완료!")
  }


  return (
    <div>
      <Link to='/'>
        <button>←</button>
      </Link>
      <CurrentItem itemId={itemId} />
      <button>수정</button>
      <button onClick={onDelete}>삭제</button>
    </div>
  )
}

export default ItemDetailed