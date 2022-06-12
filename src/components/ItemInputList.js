import React, { useState } from 'react';
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
} from 'styles/ItemInputList.style';

function ItemInputList() {
  const [quantity, setQuntity] = useState(0);
  const [attachment, setAttachment] = useState("");

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

  return (
    <Container>
      <Image>
        <label>이미지 </label>
        <img src={attachment} alt="" onChange={onFileChange} />
        {/* <input type="image" accept="image/*" src={attachment}  /> */}
      </Image>
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
        <input type="text" />
      </StorageLocation>
      <Purchase>
        <label>구매처/구매방법 </label>
        <input type="text" />
        <select name="" id="">
          <option value="online">온라인</option>
          <option value="offline">오프라인</option>
        </select>
      </Purchase>
      <Description>
        <label>설명 </label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </Description>
    </Container>
  )
}

export default ItemInputList