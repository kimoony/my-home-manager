import React from 'react'

function WishList({ wListColumns, wListData }) {
  return (
    <table>
      <thead>
        {wListColumns.map((colum) => (
          <th key={colum}>{colum}</th>
        ))}
      </thead>
      <tbody>
        {wListData.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.categ}</td>
            <td>{item.price.toLocaleString('ko-KR')}</td>
            <td>{item.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default WishList