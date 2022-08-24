import Wish from 'components/Wish';
import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function WishDetailed({ getWish }) {
  const [wishId, setWishId] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (getWish.length > 0) {
      const targetItem = getWish.find((item) => item.id === id)
      console.log(targetItem)
      if (targetItem) {
        setWishId(targetItem)
      }
    }
  }, [getWish, id])

  const onDeleteWish = async (id) => {
    const delWish = doc(db, "wishItems", wishId.id)
    await deleteDoc(delWish)
    alert("삭제완료!")
    navigate('/')
  }

  return (
    <div>
      <Link to='/'>
        <button>←</button>
      </Link>
      <Wish wishId={wishId} />
      <button onClick={onDeleteWish}>삭제</button>
    </div>
  )
}

export default WishDetailed