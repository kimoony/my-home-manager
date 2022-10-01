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

  return (
    <Container>
      <ItemName>
        <label>물품명 </label>
        <input
          name="products"
          type="text"
          value={wishValue.products}
          onChange={changeValue}
        />
      </ItemName>
      <Price>
        <label>가격 </label>
        <div>
          <input
            name="price"
            type="number"
            value={wishValue.price}
            onChange={changeValue}
          />
          <span> 원</span>
        </div>
      </Price>
      <Description>
        <label>설명 </label>
        <textarea
          name="descript"
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
