import React from 'react'
import { useRecoilState } from 'recoil';
import { loginState } from '../../atoms';

function List({ aListColumns, aListData }) {
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);

  return (
    <table style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%" }}>
      <thead style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>
        {aListColumns.map((colum) => (
          <th key={colum}>{colum}</th>
        ))}
      </thead>
      {
        isLogIn ? (
          <tbody style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", width: "100%", height: "100%" }}>
            {aListData.map((item) => (
              <tr key={item.id} style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                <td>{item.id}</td>
                <td>{item.categ}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.location}</td>
                <td>{item.storename}</td>
                <td>{item.method}</td>
                <td>{item.desc}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
            <h3>로그인 또는 회원가입 해주세요!</h3>
          </div>
        )
      }
    </table >

  )
}

export default List