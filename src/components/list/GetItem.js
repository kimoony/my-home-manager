import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";

function GetItem({ item, onDelete }) {
  const navigate = useNavigate();
  return (
    <>
      <ListContainer key={item.id}>
        <Item>
          <img src={item.productsImg} alt="" />
          <div onClick={() => navigate(`item-detail/${item.id}`)}>
            {item.products}
          </div>
          <span>{item.quantity}</span>
          <span>{item.createDate}</span>
          <div>
            <button onClick={onDelete}>
              <MdDeleteForever />
            </button>
          </div>
        </Item>
      </ListContainer>
    </>
  );
}

export default GetItem;

const ListContainer = styled.section`
  width: 90%;
  height: 100px;
  border-bottom: 2px solid #cbcdd4;
  padding: 10px 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.section`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  button {
    margin-bottom: 5px;
    font-size: 23px;
    border: none;
    background-color: #fff;
    color: #d04f4b;
    cursor: pointer;

    :hover {
      color: #ee555b;
    }
  }
`;
