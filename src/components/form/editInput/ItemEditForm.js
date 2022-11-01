import React, { useEffect, useState } from "react";
import { itemCategoryState, methodCategoryState } from "atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { GoBack } from "styles/ItemPost.style";
import ItemImage from "components/post/ItemImage";

function ItemEditForm({
  item,
  setItem,
  itemCategValue,
  onChangeICateg,
  methodCategValu,
  onChangeMCateg,
  setFile,
}) {
  const [itemCategory, setItemCategory] = useRecoilState(itemCategoryState);
  const methodCategory = useRecoilValue(methodCategoryState);

  console.log(methodCategory);

  const navigate = useNavigate();

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

  console.log(itemCategory);

  const onChangeValue = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>수정페이지</h1>
      <img src={item.productsImg} alt="" />
      <ItemImage setFile={setFile} />
      <div>
        <label>물품명: </label>
        <input name="products" value={item.products} onChange={onChangeValue} />
      </div>
      <div>
        <label>카테고리: </label>
        <select value={itemCategValue} onChange={onChangeICateg}>
          {itemCategory.map((categ) => (
            <option value={categ.category}>{categ.category}</option>
          ))}
        </select>
      </div>
      <div>
        <label>수량: </label>
        <input
          type="number"
          name="quantity"
          value={item.quantity}
          onChange={onChangeValue}
        />
      </div>
      <div>
        <label>보관위치: </label>
        <input
          name="storageLocation"
          value={item.storageLocation}
          onChange={onChangeValue}
        />
      </div>
      <div>
        <label>구매처: </label>
        <input name="purchase" value={item.purchase} onChange={onChangeValue} />
      </div>
      <div>
        <label>구매방법: </label>
        <select value={methodCategValu} onChange={onChangeMCateg}>
          {methodCategory.map((method) => (
            <option value={method.value}>{method.value}</option>
          ))}
        </select>
      </div>
      <div>
        <label>설명: </label>
        <textarea
          name="descript"
          value={item.descript}
          onChange={onChangeValue}
        />
      </div>
      <div>
        <button type="submit">Update</button>
        <GoBack onClick={() => navigate(-1)}>뒤로가기</GoBack>
      </div>
    </>
  );
}

export default ItemEditForm;
