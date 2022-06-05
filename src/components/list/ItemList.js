import React from 'react'

function List({ aListColumns, aListData }) {


  return (
    <table>
      <thead>
        {aListColumns.map((colum) => (
          <th key={colum}>{colum}</th>
        ))}
      </thead>
      <tbody>
        {aListData.map((item) => (
          <tr key={item.id}>
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
    </table>
  )
}

export default List