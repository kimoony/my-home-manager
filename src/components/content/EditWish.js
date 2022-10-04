import React from "react";

function EditWish({ wish, setWish }) {
  const onChangeWish = (e) => {
    setWish({
      ...wish,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>수정페이지</h1>
      <div>
        <label>물품명: </label>
        <input value={wish.products} name="products" onChange={onChangeWish} />
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
  );
}

export default EditWish;
