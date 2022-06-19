import React from 'react'
import { useRecoilState } from 'recoil';
import { loginState } from '../../atoms';


function WishList({ wListColumns, wListData }) {
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);

  return (
    <table style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%" }}>
      <thead style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>
        {wListColumns.map((colum) => (
          <th key={colum}>{colum}</th>
        ))}
      </thead>
      {isLogIn ? (<tbody>
        {wListData.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.categ}</td>
            <td>{item.price.toLocaleString('ko-KR')}</td>
            <td>{item.desc}</td>
          </tr>
        ))}
      </tbody>) : null}
    </table>
  )
}

export default WishList