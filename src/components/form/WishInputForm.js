import { wishPostState } from "atoms";
import React from "react";
import { useRecoilState } from "recoil";
import {
  Container,
  Ctag,
  ItemName,
  Price,
  Description,
} from "styles/WishInputForm.style";

function WishInputForm({ register, errors }) {
  const [wishValue, setWishValue] = useRecoilState(wishPostState);

  const changeValue = (e) => {
    setWishValue({ ...wishValue, [e.target.name]: e.target.value });
  };

  const WOptions = [
    { key: 0, value: "선택" },
    { key: 1, value: "생활" },
    { key: 2, value: "주방" },
    { key: 3, value: "욕실" },
    { key: 4, value: "차량" },
    { key: 5, value: "취미" },
  ];

  return (
    <Container>
      <Ctag>
        <label>카테고리 </label>
        <select
          name="wCategory"
          value={wishValue.category}
          onChange={changeValue}
        >
          {WOptions.map((wOption) => (
            <option key={wOption.key} value={wOption.value}>
              {wOption.value}
            </option>
          ))}
        </select>
      </Ctag>
      <ItemName>
        <label>물품명 </label>
        <input type="text" value={wishValue.products} onChange={changeValue} />
      </ItemName>
      <Price>
        <label>가격 </label>
        <div>
          <input type="number" value={wishValue.price} onChange={changeValue} />
          <span> 원</span>
        </div>
      </Price>
      <Description>
        <label>설명 </label>
        <textarea
          value={wishValue.descript}
          onChange={changeValue}
          cols="30"
          rows="10"
        ></textarea>
      </Description>
    </Container>
  );
}

export default WishInputForm;
