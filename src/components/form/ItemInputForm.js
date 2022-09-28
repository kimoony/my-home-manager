import React, { useRef, useState } from "react";
import ItemImage from "../post/ItemImage";
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
  Description,
} from "styles/ItemInputForm.style";
import { itemPostState, quantityState } from "atoms";
import { useRecoilState } from "recoil";

function ItemInputList({ register, errors, percent, setFile }) {
  // 카테고리
  const [newCateg, setNewCateg] = useState("");
  const [viewInput, setViewInput] = useState(false);
  const [itemsValue, setItemsValue] = useRecoilState(itemPostState);
  const [quantity, setQuantity] = useRecoilState(quantityState);

  const onClickAdd = () => {
    setViewInput(true);
  };
  const COptions = [
    { key: 0, value: "선택" },
    { key: 1, value: "생활용품" },
    { key: 2, value: "주방용품" },
    { key: 3, value: "욕실용품" },
    { key: 4, value: "차량용품" },
  ];

  const POptions = [
    { key: 0, value: "선택" },
    { key: 1, value: "온라인" },
    { key: 2, value: "오프라인" },
  ];

  const changeValue = (e) => {
    setItemsValue({
      ...itemsValue,
      [e.target.name]: e.target.value,
    });
  };

  const addCateg = (e) => {
    setNewCateg(e.target.value);
  };

  const addQuantity = () => {
    setQuantity(() => Number(quantity + 1));
  };
  const minusQuantity = () => {
    if (quantity > 0) {
      setQuantity(() => Number(quantity - 1));
    }
  };

  return (
    <Container>
      <Image>
        <ItemImage percent={percent} setFile={setFile} />
      </Image>
      <Ctag>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label>카테고리 </label>
          {viewInput ? null : (
            <input type="button" value="+" onClick={onClickAdd} />
          )}
          {viewInput ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <input type="text" onChange={changeValue} name="newCategory" />
              <button type="button">추가</button>
              <button type="button" onClick={() => setViewInput(false)}>
                취소
              </button>
            </div>
          ) : null}
        </div>
        <select
          name="category"
          value={itemsValue.category}
          onChange={changeValue}
        >
          {COptions.map((cOption) => (
            <option key={cOption.key} value={cOption.value}>
              {cOption.value}
            </option>
          ))}
        </select>
      </Ctag>
      <ItemName>
        <label>물품명 </label>
        <input
          type="text"
          onChange={changeValue}
          name="products"
          value={itemsValue.products}
        />
      </ItemName>
      <Quantity>
        <label>수량 </label>
        <NumInput>
          <button type="button" onClick={minusQuantity}>
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={changeValue}
            name="quantity"
          />
          <button type="button" onClick={addQuantity}>
            +
          </button>
        </NumInput>
      </Quantity>
      <StorageLocation>
        <label>보관위치 </label>
        <input
          type="text"
          onChange={changeValue}
          value={itemsValue.location}
          name="location"
        />
      </StorageLocation>
      <Purchase>
        <label>구매처/구매방법 </label>
        <input
          type="text"
          onChange={changeValue}
          value={itemsValue.purchase}
          name="purchase"
        />
        <select onChange={changeValue} name="purchaseMethod">
          {POptions.map((pOption) => (
            <option key={pOption.key} value={pOption.value}>
              {pOption.value}
            </option>
          ))}
        </select>
      </Purchase>
      <Description>
        <label>설명 </label>
        <textarea
          cols="30"
          rows="10"
          onChange={changeValue}
          value={itemsValue.descript}
          name="descript"
        />
      </Description>
    </Container>
  );
}

export default ItemInputList;
