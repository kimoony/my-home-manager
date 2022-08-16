import CurrentWish from 'components/CurrentWish';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function WishDetailed({ getWish }) {
  const [wishId, setWishId] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (getWish.length > 0) {
      const targetItem = getWish.find((item) => item.id === id)
      console.log(targetItem)
      if (targetItem) {
        setWishId(targetItem)
      }
    }
  }, [getWish, id])
  return (
    <div>
      <Link to='/'>
        <button>←</button>
      </Link>
      <CurrentWish wishId={wishId} />
      <button>삭제</button>
    </div>
  )
}

export default WishDetailed