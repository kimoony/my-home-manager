import React, { useState } from "react";

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
    <div style={{ display: "flex", alignItems: "center" }}>
      <label>카테고리 </label>
      {viewInput ? null : (
        <>
          <input type="button" value="+" onClick={onClickAdd} />
          <input
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
            {categ.category} <span onClick={removeCateg}>x</span>
          </div>
        ))
      ) : null}
    </div>
  );
}

export default AddNewCateg;
