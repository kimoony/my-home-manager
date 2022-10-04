import React from "react";

function EditItem({ item, setItem }) {
  const changeValue = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>수정페이지</h1>
      <div>
        <label>물품명: </label>
        <input
          name="products"
          value={item.products}
          onChange={changeValue}
        ></input>
      </div>
      <div>
        <label>카테고리: </label>
        <select name="category">
          <option
            name="category"
            value={item.category}
            onChange={changeValue}
          ></option>
        </select>
      </div>
      <div>
        <label>수량: </label>
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={changeValue}
        ></input>
      </div>
      <div>
        <label>보관위치: </label>
        <input
          name="storageLocation"
          value={item.storageLocation}
          onChange={changeValue}
        ></input>
      </div>
      <div>
        <label>구매처: </label>
        <input
          name="purchase"
          value={item.purchase}
          onChange={changeValue}
        ></input>
      </div>
      <div>
        <label>구매처/구매방법: </label>
        <select name="purchaseMethod">
          <option
            name="purchaseMethod"
            value={item.purchaseMethod}
            onChange={changeValue}
          ></option>
        </select>
      </div>
      <div>
        <label>설명: </label>
        <textarea
          name="descript"
          value={item.descript}
          onChange={changeValue}
        ></textarea>
      </div>
    </>
  );
}

export default EditItem;
