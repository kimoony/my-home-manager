import React from "react";
import styled from "styled-components";

function ItemImage({ setFile, percent, image, uploadImage }) {
  // const [isEdit, setIsEdit] = useRecoilState(editState);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Wrapper>
      <SelectImgBtn type="file" accept="image/*" onChange={handleChange} />
      <UploadBox>
        <input type="button" value="업로드" onClick={uploadImage} />
        <span>{percent} "% 완료"</span>
      </UploadBox>
    </Wrapper>
  );
}

export default ItemImage;

const Wrapper = styled.div`
  width: 330px;
`;

const SelectImgBtn = styled.input`
  margin-bottom: 5px;
`;

const UploadBox = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    border: none;
    padding: 5px 10px;
    background-color: #616365;
    color: #fff;
    border-radius: 10px;

    :hover {
      background-color: #667078;
    }
  }
`;
