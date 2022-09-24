import React from 'react'
import {
  Container,
  Ctag,
  ItemName,
  Price,
  Description
} from 'styles/WishInputForm.style';

function WishInputForm({
  register,
  errors,
  wCateg,
  setWCateg,
  setWItemName,
  price,
  setPrice,
  setWDesc
}) {

  const wCategSelect = (e) => {
    setWCateg(e.target.value)
  }

  const wNameChange = (e) => {
    setWItemName(e.target.value)
  }

  const numChange = (e) => {
    setPrice(e.target.value).toLocaleString('ko-KR')
  }

  const descChange = (e) => {
    setWDesc(e.target.value)
  }

  const WOptions = [
    { key: 0, value: "선택" },
    { key: 1, value: "생활" },
    { key: 2, value: "주방" },
    { key: 3, value: "욕실" },
    { key: 4, value: "차량" },
    { key: 5, value: "취미" },
  ]

  return (
    <Container>
      <Ctag>
        <label>카테고리 </label>
        <select
          name="wCategory"
          value={wCateg}
          onChange={wCategSelect}
        >
          {
            WOptions.map((wOption) => (
              <option key={wOption.key} value={wOption.value} >{wOption.value}</option>
            ))
          }
        </select>
      </Ctag>
      <ItemName>
        <label>물품명 </label>
        <input type="text" onChange={wNameChange} />
      </ItemName>
      <Price>
        <label>가격 </label>
        <div>
          <input type="number" value={price} onChange={numChange} />
          <span> 원</span>
        </div>
      </Price>
      <Description>
        <label>설명 </label>
        <textarea onChange={descChange} cols="30" rows="10"></textarea>
      </Description>
    </Container>
  )
}

export default WishInputForm