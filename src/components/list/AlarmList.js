import React from "react";
import { useRecoilValue } from "recoil";
import { getItemsState, loginState } from "../../atoms";
import styled from "styled-components";

const Alarm = styled.li`
  font-size: 1.2rem;
`;

function AlarmList({ userObj }) {
  const isLogIn = useRecoilValue(loginState);
  const getItems = useRecoilValue(getItemsState);

  return (
    <ul>
      {isLogIn
        ? getItems.map((it) =>
            userObj.uid === it.creatorId ? (
              <Alarm key={it.id}>
                {it.quantity <= 3
                  ? `${it.products}가 ${it.quantity}개 남았습니다. `
                  : ""}
              </Alarm>
            ) : null
          )
        : null}
    </ul>
  );
}

export default AlarmList;
