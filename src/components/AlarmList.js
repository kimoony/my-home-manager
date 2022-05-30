import React from 'react'

function AlarmList({ aListData }) {
  return (
    <>
      {
        aListData.map((it) => (
          <div>
            {
              it.quantity <= 3 ?
                `${it.name}가 ${it.quantity}개 남았습니다. `
                : ""
            }
          </div>
        ))
      }
    </>
  )
}

export default AlarmList