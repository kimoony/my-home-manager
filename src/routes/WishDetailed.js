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
      <div>
        <h1>상세페이지</h1>
        <div>{wishId.id}</div>
        <p>등록시간: {wishId.createDate}</p>
        {/* <h3>`이 게시물은  번째 입니다.`</h3> */}
        {/* <div>{getImages}</div> */}
        <div>
          <label>카테고리: </label>
          <span>{wishId.categ}</span>
        </div>
        <div>
          <label>물품명: </label>
          <span>{wishId.name}</span>
        </div>
        <div>
          <label>가격: </label>
          <span>{wishId.price}</span>
        </div>
        <div>
          <label>설명: </label>
          <span>{wishId.descript}</span>
        </div>
        <button>삭제</button>
      </div>
    </div>
  )
}

export default WishDetailed