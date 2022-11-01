import React from "react";

function ItemImage({ setFile, percent, image }) {
  // const [isEdit, setIsEdit] = useRecoilState(editState);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />

      <span>{percent} "% 완료"</span>
    </div>
  );
}

export default ItemImage;
