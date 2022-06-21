import React, { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { quantityState } from '../atoms';
import {
  Container,
  Image,
  Ctag,
  ItemName,
  Quantity,
  NumInput,
  StorageLocation,
  Purchase,
  Description
} from 'styles/ItemInputForm.style';

function ItemInputList({ write, setWrite }) {
  // 이미지
  const [attachment, setAttachment] = useState("");
  // 카테고리 
  const [newCateg, setNewCateg] = useState("")
  const [selectCateg, setSelectCateg] = useState()
  const [viewInput, setViewInput] = useState(false);
  // 물품명
  const [newName, setNewName] = useState("");
  // 수량
  const [quantity, setQuntity] = useRecoilState(quantityState);
  // 보관 위치
  const [sLocation, setsLocation] = useState("");
  // 구매처
  const [purchase, setPurchase] = useState("");
  // 구매방법
  const [pMethod, setPMethod] = useState()
  // 설명
  const [descript, setDescript] = useState("");



  const onClickAdd = () => {
    setViewInput(true)
  }
  const COptions = [
    { key: 0, value: "생활용품" },
    { key: 1, value: "주방용품" },
    { key: 2, value: "욕실용품" },
    { key: 3, value: "차량용품" },
  ]

  const addCateg = (e) => {
    setNewCateg(e.target.value)
  }

  let optionKey = 4;
  const addClick = () => {
    COptions.push({ key: optionKey, value: newCateg })
  }
  optionKey += 1;

  const addSelectCateg = (e) => {
    setSelectCateg(e.target.value)
  }
  console.log(COptions)

  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const productName = (e) => {
    setNewName(e.target.value)
  }

  const addQuantity = (e) => {
    e.preventDefault();
    setQuntity((prev) => prev + 1)
  }
  const minusQuantity = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      setQuntity((prev) => prev - 1)
    }
  }

  const storageLocation = (e) => {
    setsLocation(e.target.value)
  }

  const purchaseValue = (e) => {
    setPurchase(e.target.value)
  }

  const POptions = [
    { key: 0, value: "온라인" },
    { key: 1, value: "오프라인" },
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
        <label>이미지 </label>
        <input type="file" accept="image/*" src={attachment} />
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
                <input type="text" value={newCateg} onChange={addCateg} />
                <button type="button" onClick={addClick}>추가</button>
                <button type="button" onClick={() => setViewInput(false)}>취소</button>
              </div>
              : null
          }
        </div>
        <select
          name="category"
          value={selectCateg}
          onChange={addSelectCateg}
        >
          {
            COptions.map((cOption) => (
              <option key={cOption.key} value={cOption.key} >{cOption.value}</option>
            ))
          }
        </select>
      </Ctag>
      <ItemName>
        <label>물품명 </label>
        <input type="text" value={newName} onChange={productName} />
      </ItemName>
      <Quantity>
        <label>수량 </label>
        <NumInput>
          <button onClick={minusQuantity}>-</button>
          <input type="number" name="quantity" value={quantity} />
          <button onClick={addQuantity}>+</button>
        </NumInput>
      </Quantity>
      <StorageLocation>
        <label>보관위치 </label>
        <input type="text" value={sLocation} onChange={storageLocation} />
      </StorageLocation>
      <Purchase>
        <label>구매처/구매방법 </label>
        <input type="text" value={purchase} onChange={purchaseValue} />
        <select value={pMethod} onChange={purchaseMethod}>
          {
            POptions.map((pOption) => (
              <option key={pOption.key} value={pOption.key}>{pOption.value}</option>
            ))
          }
        </select>
      </Purchase>
      <Description>
        <label>설명 </label>
        <textarea
          cols="30"
          rows="10"
          value={descript}
          onChange={descriptValue}
        />
      </Description>
    </Container>
  )
}

export default ItemInputList