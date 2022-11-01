import React, { useEffect, useState } from "react";
import Item from "components/content/Item";
import styled from "styled-components";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { editState, getItemsState } from "atoms";
import { useRecoilState } from "recoil";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

function ItemDetailed() {
  const [targetId, setTargetId] = useState({});
  const [getItems, setGetItems] = useRecoilState(getItemsState);

  const [itemCategValue, setItemCategValue] = useState(targetId.category);
  const [methodCategValue, setMethodCategValue] = useState(
    targetId.purchaseMethod
  );
  const [isEdit, setIsEdit] = useRecoilState(editState);

  const onChangeICateg = (e) => {
    setItemCategValue(e.target.value);
  };
  const onChangeMCateg = (e) => {
    setMethodCategValue(e.target.value);
  };

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (getItems.length > 0) {
      const targetItem = getItems.find((item) => item.id === id);
      console.log(targetItem);
      if (targetItem) {
        setTargetId(targetItem);
      }
    }
  }, [getItems, id]);

  const onDeleteItem = async (id) => {
    const delItem = doc(db, "items", targetId.id);
    await deleteDoc(delItem);
    setGetItems(getItems.filter((item) => item.id !== targetId.id));
    alert("삭제완료!");
    navigate("/");
  };

  const onClickEdit = () => {
    navigate(`/item-detail/${targetId.id}/edit`);
    setIsEdit(!isEdit);
  };

  return (
    <DetailContainer>
      <MainContent>
        <Item
          item={targetId}
          setItem={setTargetId}
          itemCategValue={itemCategValue}
          methodCategValue={methodCategValue}
          onChangeICateg={onChangeICateg}
          onChangeMCateg={onChangeMCateg}
        />
      </MainContent>
      <BottomBtn>
        <EditBtn onClick={onClickEdit}>
          <FiEdit />
        </EditBtn>
        <DelBtn onClick={onDeleteItem}>
          <MdDeleteForever />
        </DelBtn>
      </BottomBtn>
    </DetailContainer>
  );
}

export default ItemDetailed;

const DetailContainer = styled.section`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 80%;
  width: 20rem;
  padding: 16px;
  text-align: center;
`;

const MainContent = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const BottomBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditBtn = styled.button`
  margin-bottom: 5px;
  font-size: 23px;
  border: none;
  background-color: #fff;
  color: #616365;
  cursor: pointer;

  :hover {
    color: #667078;
  }
`;

const DelBtn = styled.button`
  margin-bottom: 5px;
  font-size: 23px;
  border: none;
  background-color: #fff;
  color: #d04f4b;
  cursor: pointer;

  :hover {
    color: #ee555b;
  }
`;
