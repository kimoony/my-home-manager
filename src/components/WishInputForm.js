import React, { useState } from 'react'
import {
  Container,
  Ctag,
  ItemName,
  Price,
  Description
} from 'styles/WishInputForm.style';

function WishInputForm() {
  const [price, setPrice] = useState(0);

  const numChange = (e) => {
    setPrice(e.target.value).toLocaleString('ko-KR')
  }

  return (
    <Container>
      <Ctag>
        <label>카테고리 </label>
        <select name="" id="">
          <option value=""></option>
        </select>
      </Ctag>
      <ItemName>
        <label>물품명 </label>
        <input type="text" />
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
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </Description>
    </Container>
  )
}

export default WishInputForm