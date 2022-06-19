import React from 'react'
import { useRecoilState } from 'recoil';
import { loginState } from '../../atoms';


function AlarmList({ aListData }) {
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);

  return (
    <>
      {isLogIn ? (
        aListData.map((it) => (
          <div key={it.id}>
            {
              it.quantity <= 3 ?
                `${it.name}가 ${it.quantity}개 남았습니다. `
                : ""
            }
          </div>
        ))
      ) : null
      }
    </>
  )
}

export default AlarmList