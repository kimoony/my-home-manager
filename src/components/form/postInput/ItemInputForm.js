import React, { useState } from "react";
import ItemImage from "../../post/ItemImage";
import AddNewCateg from "../../AddNewCateg";
import styled from "styled-components";
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
import { db } from "../../../firebase";
import { useEffect } from "react";

function ItemInputList({
  register,
  errors,
  percent,
  setFile,
  userObj,
  categoryValue,
  setCatagoryValue,
  methodValue,
  setMethodValue,
  uploadImage,
}) {
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
  }, [setItemCategory, itemCategory]);

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

  const categChange = (e) => {
    setCatagoryValue(e.target.value);
  };

  const methodChange = (e) => {
    setMethodValue(e.target.value);
  };

  const addCateg = async () => {
    try {
      const categRef = await addDoc(collection(db, "itemCateg"), {
        category: newCateg,
        creatorId: userObj.uid,
      });
      console.log(categRef.id);
      setItemCategory([...itemCategory, newCateg]);
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
        <ItemImage
          percent={percent}
          setFile={setFile}
          uploadImage={uploadImage}
        />
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
        <select value={categoryValue} onChange={categChange}>
          <option value="none"> 선택 </option>
          {itemCategory.map((categ) => (
            <option key={categ.id} value={categ.category}>
              {categ.category}
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
        <select onChange={methodChange} value={methodValue}>
          {methodCategory.map((method) => (
            <option key={method.key} value={method.value}>
              {method.value}
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

const Container = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0px;

  label {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 5px 0px;
  }
`;

const Image = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Ctag = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  select {
    margin-top: 10px;
    text-align: center;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    padding: 5px 0px;
  }
  label {
    margin-right: 10px;
  }
`;

const ItemName = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 320px;

  input {
    padding: 5px 0;
    padding-left: 10px;
    border-radius: 10px;
  }
`;

const Quantity = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  input {
    padding: 5px 0;
    border-radius: 10px;
  }

  button {
    border: none;
    border-radius: 50%;
    background-color: #616365;
    font-weight: bold;
    color: #fff;
    padding: 0px 10px;

    :hover {
      background-color: #667078;
    }
  }
`;

const NumInput = styled.div`
  width: 320px;
  display: flex;

  input {
    width: 290px;
    text-align: center;
    margin: 0px 10px;
    padding-left: 10px;
    border-radius: 10px;
  }
`;

const StorageLocation = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  input {
    padding: 5px 0;
    padding-left: 10px;
    border-radius: 10px;
  }
`;
const Purchase = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  input {
    padding: 5px 0;
    margin-bottom: 5px;
    padding-left: 10px;
    border-radius: 10px;
  }

  select {
    margin-top: 10px;
    text-align: center;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    padding: 5px 0px;
  }
`;
const Description = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  textarea {
    border-radius: 10px;
    padding-left: 10px;
  }
`;
