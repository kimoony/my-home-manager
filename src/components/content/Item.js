import React, { useState } from "react";
import EditItem from "./EditItem";

function CurrentItem({
  item,
  setItem,
  isEdit,
  itemCategValue,
  methodCategValue,
  onChangeICateg,
  onChangeMCateg,
}) {
  return (
    <div>
      {isEdit === false ? (
        <>
          <img src={item.productsImg} alt="" />
          <h1>{item.products}</h1>
          <p>등록시간: {item.createDate}</p>
          <div>
            <label>카테고리: </label>
            <span>{item.category}</span>
          </div>
          <div>
            <label>수량: </label>
            <span>{item.quantity}</span>
          </div>
          <div>
            <label>보관위치: </label>
            <span>{item.storageLocation}</span>
          </div>
          <div>
            <label>구매처/구매방법: </label>
            <span>
              {item.purchase} / {item.purchaseMethod}
            </span>
          </div>
          <div>
            <label>설명: </label>
            <span>{item.descript}</span>
          </div>
        </>
      ) : (
        <EditItem
          item={item}
          setItem={setItem}
          itemCategValue={itemCategValue}
          onChangeICateg={onChangeICateg}
          methodCategValue={methodCategValue}
          onChangeMCateg={onChangeMCateg}
        />
      )}
    </div>
  );
}

export default CurrentItem;
