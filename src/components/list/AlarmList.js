import React from "react";
import { useRecoilValue } from "recoil";
import { getItemsState, loginState } from "../../atoms";

function AlarmList({ userObj }) {
  const isLogIn = useRecoilValue(loginState);
  const getItems = useRecoilValue(getItemsState);

  return (
    <>
      {isLogIn
        ? getItems.map((it) =>
            userObj.uid === it.creatorId ? (
              <div key={it.id}>
                {it.quantity <= 3
                  ? `${it.products}가 ${it.quantity}개 남았습니다. `
                  : ""}
              </div>
            ) : null
          )
        : null}
    </>
  );
}

export default AlarmList;
