import React, { useRef, useState } from 'react';
import ItemImage from './post/ItemImage';
import {
  Container,
  LeftContainer,
  RightContainer,
  Image,
  Ctag,
  ItemName,
  Quantity,
  NumInput,
  StorageLocation,
  Purchase,
  Description
} from 'styles/ItemInputForm.style';


function ItemInputList({
  register,
  errors,
  selectCateg,
  setSelectCateg,
  setNewName,
  quantity,
  setQuantity,
  setsLocation,
  setPurchase,
  setPMethod,
  setDescript,
  percent,
  setFile,
}) {
  // 카테고리 
  const [newCateg, setNewCateg] = useState("")
  const [viewInput, setViewInput] = useState(false);


  const onClickAdd = () => {
    setViewInput(true)
  }
  const COptions = [
    { key: 0, value: "선택" },
    { key: 1, value: "생활용품" },
    { key: 2, value: "주방용품" },
    { key: 3, value: "욕실용품" },
    { key: 4, value: "차량용품" },
  ]

  const addCateg = (e) => {
    setNewCateg(e.target.value)
  }

  const optionKey = useRef(5);
  const addClick = () => {
    setSelectCateg(COptions.push({ key: optionKey.current, value: newCateg }))
  }
  optionKey.current += 1;

  const selectCategory = (e) => {
    setSelectCateg(e.target.value)
  }
  // console.log(COptions)

  const productName = (e) => {
    setNewName(e.target.value)
  }

  const quantityChange = (e) => {
    setQuantity(e.target.value)
  }
  const addQuantity = (e) => {
    setQuantity((prev) => Number(prev) + 1)
  }
  const minusQuantity = (e) => {
    if (quantity > 0) {
      setQuantity((prev) => Number(prev) - 1)
    }
  }

  const storageLocation = (e) => {
    setsLocation(e.target.value)
  }

  const purchaseValue = (e) => {
    setPurchase(e.target.value)
  }

  const POptions = [
    { key: 0, value: "선택" },
    { key: 1, value: "온라인" },
    { key: 2, value: "오프라인" },
  ]
  const purchaseMethod = (e) => {
    setPMethod(e.target.value)
  }

  const descriptValue = (e) => {
    setDescript(e.target.value)
  }

  return (
    <Container>
      <Image>
        <ItemImage percent={percent} setFile={setFile} />
      </Image>
      <Ctag>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label>카테고리 </label>
          {viewInput ?
            null :
            <input type="button" value="+" onClick={onClickAdd} />
          }
          {
            viewInput ?
              <div style={{ display: "flex", alignItems: "center" }}>
                <input type="text" onChange={addCateg} />
                <button type="button" onClick={addClick}>추가</button>
                <button type="button" onClick={() => setViewInput(false)}>취소</button>
              </div>
              : null
          }
        </div>
        <select
          name="category"
          value={selectCateg}
          onChange={selectCategory}
        >
          {
            COptions.map((cOption) => (
              <option key={cOption.key} value={cOption.value} >{cOption.value}</option>
            ))
          }
        </select>
      </Ctag>
      <ItemName>
        <label>물품명 </label>
        <input type="text" onChange={productName} />
      </ItemName>
      <Quantity>
        <label>수량 </label>
        <NumInput>
          <button type="button" onClick={minusQuantity}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={quantityChange}
          />
          <button type="button" onClick={addQuantity}>+</button>
        </NumInput>
      </Quantity>
      <StorageLocation>
        <label>보관위치 </label>
        <input type="text" onChange={storageLocation} />
      </StorageLocation>
      <Purchase>
        <label>구매처/구매방법 </label>
        <input type="text" onChange={purchaseValue} />
        <select onChange={purchaseMethod}>
          {
            POptions.map((pOption) => (
              <option key={pOption.key} value={pOption.value}>
                {pOption.value}
              </option>
            ))
          }
        </select>
      </Purchase>
      <Description>
        <label>설명 </label>
        <textarea
          cols="30"
          rows="10"
          onChange={descriptValue}
        />
      </Description>
    </Container>
  )
}

export default ItemInputList