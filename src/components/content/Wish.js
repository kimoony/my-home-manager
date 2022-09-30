import React from "react";

function CurrentWish({ wish, setWish, isEdit }) {
  const onChangeWish = (e) => {
    setWish({
      ...wish,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      {isEdit === false ? (
        <>
          <h1>{wish.products}</h1>
          <p>등록시간: {wish.createDate}</p>
          {/* <div>{getImages}</div> */}
          <div>
            <label>카테고리: </label>
            <span>{wish.category}</span>
          </div>
          <div>
            <label>가격: </label>
            <span>{wish.price}</span>
          </div>
          <div>
            <label>설명: </label>
            <span>{wish.descript}</span>
          </div>
        </>
      ) : (
        <>
          <h1>수정페이지</h1>
          <div>
            <label>물품명: </label>
            <input
              value={wish.products}
              name="products"
              onChange={onChangeWish}
            />
          </div>
          {/* <div>{getImages}</div> */}
          <div>
            <label>카테고리: </label>
            <select name="">
              <option
                value={wish.category}
                name="category"
                onChange={onChangeWish}
              ></option>
            </select>
          </div>
          <div>
            <label>가격: </label>
            <input
              type="number"
              name="price"
              value={wish.price}
              onChange={onChangeWish}
            />
          </div>
          <div>
            <label>설명: </label>
            <textarea
              value={wish.descript}
              name="descript"
              onChange={onChangeWish}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentWish;
