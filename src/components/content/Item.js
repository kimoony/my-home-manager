import React from "react";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { BackBtn } from "components/form/sign/SignForm";
import { useNavigate } from "react-router-dom";

function CurrentItem({
  item,
  setItem,
  itemCategValue,
  methodCategValue,
  onChangeICateg,
  onChangeMCateg,
}) {
  const navigate = useNavigate();

  return (
    <>
      <TopBox>
        <BackBtn type="button" onClick={() => navigate("/")}>
          <BiArrowBack />
        </BackBtn>
        <span>{item.createDate}</span>
      </TopBox>
      <Image src={item.productsImg} alt="" />
      <BottomLine />
      <ContentBox>
        <ProductName>{item.products}</ProductName>
        <ContentAlign>
          <label>카테고리: </label>
          <span>{item.category}</span>
        </ContentAlign>
        <ContentAlign>
          <label>현재수량: </label>
          <span>{item.quantity}</span>
        </ContentAlign>
        <ContentAlign>
          <label>보관위치: </label>
          <span>{item.storageLocation}</span>
        </ContentAlign>
        <ContentAlign>
          <label>구매처: </label>
          <span>{item.purchase}</span>
        </ContentAlign>
        <ContentAlign>
          <label>구매방법: </label>
          <span>{item.purchaseMethod}</span>
        </ContentAlign>
        <ContentAlign>
          <label>설명: </label>
          <span>{item.descript}</span>
        </ContentAlign>
      </ContentBox>
    </>
  );
}

export default CurrentItem;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Image = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 10px;
`;

const BottomLine = styled.div`
  width: 330px;
  border-bottom: 1px solid #cbcdd4;
`;

const ProductName = styled.h1`
  font-size: 3rem;
  margin: 20px 0;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentAlign = styled.div`
  align-self: flex-start;
  margin-bottom: 5px;
  font-size: 18px;
`;
