import React, { useState } from "react";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";

function AddNewCateg({
  viewInput,
  setViewInput,
  itemCategory,
  addCateg,
  removeCateg,
  setNewCateg,
}) {
  const [showCateg, setShowCateg] = useState(false);

  const onClickAdd = () => {
    setViewInput(true);
  };

  const onChangeCateg = (e) => {
    setNewCateg(e.target.value);
  };

  return (
    <Wrapper>
      <label>카테고리 </label>
      {viewInput ? null : (
        <>
          <Btn type="button" value="+" onClick={onClickAdd} />
          <Btn
            type="button"
            value="-"
            onClick={() => setShowCateg(!showCateg)}
          />
        </>
      )}
      {viewInput ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type="text" onChange={onChangeCateg} name="newCategory" />
          <button type="button" onClick={addCateg}>
            추가
          </button>
          <button type="button" onClick={() => setViewInput(false)}>
            취소
          </button>
        </div>
      ) : showCateg ? (
        itemCategory.map((categ) => (
          <div key={categ.id}>
            <div>{categ.category}</div>
            <span onClick={removeCateg}>
              <MdDeleteForever />
            </span>
          </div>
        ))
      ) : null}
    </Wrapper>
  );
}

export default AddNewCateg;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Btn = styled.input`
  font-size: 18px;
  border-radius: 50%;
  background-color: #667078;
  color: #fff;
  border: none;
  margin-top: 5px;
  width: 20px;
  height: 20px;
  padding: 0px;

  :hover {
    background-color: #616365;
  }
  :last-child {
    margin-left: 2px;
  }
`;
