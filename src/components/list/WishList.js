import React from 'react'

function WishList({ wListColumns, wListData }) {
  return (
    <>
      <thead>
        <tr>
          {wListColumns.map((colum) => (
            <th key={colum}>{colum}</th>
          ))}
        </tr>
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
    </>
  )
}

export default WishList