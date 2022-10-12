import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";

function GetWish({ wish, onClickDelete }) {
  const navigate = useNavigate();

  return (
    <ListContainer>
      <Wish onClick={() => navigate(`wish-detail/${wish.id}`)}>
        <div>{wish.products}</div>
        <div>{wish.price}</div>
        <span>{wish.createDate}</span>
        <div>
          <button onClick={onClickDelete}>
            <MdDeleteForever />
          </button>
        </div>
      </Wish>
    </ListContainer>
  );
}

export default GetWish;

const ListContainer = styled.section`
  width: 90%;
  height: 100px;
  border-bottom: 2px solid #cbcdd4;
  padding: 10px 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const Wish = styled.section`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(4, 1fr);

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
