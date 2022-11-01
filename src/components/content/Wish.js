import React from "react";
import EditWish from "../form/editInput/EditWish";

function CurrentWish({ wish, setWish, isEdit }) {
  return (
    <div>
      {isEdit === false ? (
        <>
          <h1>{wish.products}</h1>
          <p>등록시간: {wish.createDate}</p>
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
        <EditWish wish={wish} setWish={setWish} />
      )}
    </div>
  );
}

export default CurrentWish;
