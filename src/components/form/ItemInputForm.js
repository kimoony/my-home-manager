import React, { useRef, useState } from "react";
import ItemImage from "../post/ItemImage";
import AddNewCateg from "../AddNewCateg";
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
import {
  itemPostState,
  quantityState,
  itemCategoryState,
  methodCategoryState,
} from "atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";

function ItemInputList({ register, errors, percent, setFile, userObj }) {
  const [itemsValue, setItemsValue] = useRecoilState(itemPostState);
  const [quantity, setQuantity] = useRecoilState(quantityState);

  const [viewInput, setViewInput] = useState(false);
  const [newCateg, setNewCateg] = useState("");
  const [itemCategory, setItemCategory] = useRecoilState(itemCategoryState);
  const [targetCateg, setTargetCateg] = useState({});

  const methodCategory = useRecoilValue(methodCategoryState);

  useEffect(() => {
    const getItemCategData = async () => {
      const data = await getDocs(collection(db, "itemCateg"));
      setItemCategory(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getItemCategData();
  }, [setItemCategory]);

  useEffect(() => {
    if (itemCategory.length > 0) {
      const targetC = itemCategory.find((item) => item.id);

      if (targetC) {
        setTargetCateg(targetC);
      }
    }
  }, [itemCategory]);

  const changeValue = (e) => {
    setItemsValue({
      ...itemsValue,
      [e.target.name]: e.target.value,
    });
  };

  const addCateg = async () => {
    try {
      const categRef = await addDoc(collection(db, "itemCateg"), {
        category: newCateg,
        creatorId: userObj.uid,
      });
      console.log(categRef.id);
      // setItemCategory([...itemCategory, newCateg]);
      setViewInput(false);
      alert("추가 완료!");
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeCateg = async () => {
    const delItemCateg = doc(db, "itemCateg", targetCateg.id);
    await deleteDoc(delItemCateg);
    setItemCategory(
      itemCategory.filter((categ) => categ.id !== targetCateg.id)
    );
    alert("삭제");
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
        <AddNewCateg
          viewInput={viewInput}
          setViewInput={setViewInput}
          itemCategory={itemCategory}
          addCateg={addCateg}
          removeCateg={removeCateg}
          setNewCateg={setNewCateg}
        />
        <select
          name="category"
          value={itemsValue.category}
          onChange={changeValue}
        >
          {itemCategory.map((option) => (
            <option key={option.id} value={option.category}>
              {option.category}
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
          {methodCategory.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
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
