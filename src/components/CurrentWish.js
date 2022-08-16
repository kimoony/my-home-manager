import React from 'react'

function CurrentWish({ wishId }) {
  return (
    <div>
      <h1>{wishId.name}</h1>
      <div>{wishId.id}</div>
      <p>등록시간: {wishId.createDate}</p>
      {/* <h3>`이 게시물은  번째 입니다.`</h3> */}
      {/* <div>{getImages}</div> */}
      <div>
        <label>카테고리: </label>
        <span>{wishId.categ}</span>
      </div>
      <div>
        <label>가격: </label>
        <span>{wishId.price}</span>
      </div>
      <div>
        <label>설명: </label>
        <span>{wishId.descript}</span>
      </div>
    </div>
  )
}

export default CurrentWish