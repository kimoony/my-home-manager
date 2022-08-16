import React from 'react'

function CurrentItem({ itemId }) {
  return (
    <div>
      <h1>{itemId.name}</h1>
      <p>등록시간: {itemId.createDate}</p>
      {/* <div>{getImages}</div> */}
      <div>
        <label>카테고리: </label>
        <span>{itemId.categ}</span>
      </div>
      <div>
        <label>수량: </label>
        <span>{itemId.quantity}</span>
      </div>
      <div>
        <label>보관위치: </label>
        <span>{itemId.storageLocation}</span>
      </div>
      <div>
        <label>구매처/구매방법: </label>
        <span>{itemId.purchase} / {itemId.pMethod}</span>
      </div>
      <div>
        <label>설명: </label>
        <span>{itemId.descript}</span>
      </div>
    </div>
  )
}

export default CurrentItem