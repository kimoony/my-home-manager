import AlarmList from '../components/AlarmList';
import WishList from '../components/WishList';
import React, { useEffect } from 'react';
import ItemList from '../components/ItemList';
import {
  Wrapper,
  Header,
  Title,
  ThemeMode,
  BtnWrapper,
  SignBtn,
  ListWrapper,
  LeftBox,
  AllList,
  RightBox,
  TopList,
  BottomList
} from '../styles/Home.style';



const aListColumns = [
  "번호",
  "카테고리",
  "상품명",
  "수량",
  "보관위치",
  "구입처",
  "구입방법",
  "설명"
];

const aListData = [
  {
    id: 1,
    categ: "생필품",
    name: "칫솔",
    quantity: 5,
    location: "화장실",
    storename: "Amway",
    method: "online",
    desc: "이를 닦는 칫솔"
  },
  {
    id: 2,
    categ: "생필품",
    name: "건전지(AA)",
    quantity: 3,
    location: "신발장",
    storename: "이마트",
    method: "online",
    desc: "하성이 장난감에 들어갈 건전지"
  },
  {
    id: 3,
    categ: "생필품",
    name: "전구",
    quantity: 2,
    location: "신발장",
    storename: "이케아",
    method: "offline",
    desc: "화장실 및 조명대에 들어갈 전구"
  },
  {
    id: 4,
    categ: "생필품",
    name: "칫솔",
    quantity: 5,
    location: "화장실",
    storename: "Amway",
    method: "online",
    desc: "이를 닦는 칫솔"
  },
];

const wListColumns = [
  "상품명",
  "카테고리",
  "가격",
  "설명"
];

const wListData = [
  {
    id: 1,
    name: "카밈 울트라 엔진 에디티브",
    categ: "차량용품",
    price: 39900,
    desc: "1+1+1 특가중"
  },
  {
    id: 2,
    name: "스테인리스 316 양면 도마",
    categ: "주방용품",
    price: 33800,
    desc: "스테인리스 SUS-316으로 제작된 프리엄 우생 도마"
  },
];



function Home() {

  return (
    <Wrapper>
      <Header>
        <Title>Home Manager</Title>
        {/* <ThemeMode type="checkbox" text="a" /> */}
      </Header>
      <BtnWrapper>
        <SignBtn>Sign Up</SignBtn>
        <SignBtn>Sign In</SignBtn>
      </BtnWrapper>
      <ListWrapper>
        <LeftBox>
          <h3>전체리스트</h3>
          <AllList>
            <ItemList aListColumns={aListColumns} aListData={aListData} />
          </AllList>
          <button>등록하기</button>
        </LeftBox>
        <RightBox>
          <h3>알림리스트</h3>
          <TopList>
            <AlarmList aListData={aListData} />
          </TopList>
          <h3>위시리스트</h3>
          <BottomList>
            <WishList wListColumns={wListColumns} wListData={wListData} />
          </BottomList>
          <button>등록하기</button>
        </RightBox>
      </ListWrapper>
    </Wrapper>
  )
}

export default Home