import React from 'react'
import {
  Wrapper,
  Form,
  Header,
  Title,
  BtnBox,
  GoBack,
  PostBtn,
  Footer,
} from 'styles/ItemPost.style';

function ItemPost() {
  return (
    <Wrapper>
      <Form>
        <Header>
          <BtnBox>
            <GoBack>←</GoBack>
          </BtnBox>
          <Title>
            ItemPost
          </Title>
        </Header>
        <main>
          <label>이미지</label>
          <img src="" alt="" />
          <label>카테고리</label>
          <select name="" id="">
            <option value=""></option>
          </select>
          <label>물품명</label>
          <input type="text" />
          <label>수량</label>
          <button>-</button>
          <input type="number" name="" id="" />
          <button>+</button>
          <label>보관위치</label>
          <input type="text" />
          <label>구매처/구매방법</label>
          <input type="text" />
          <select name="" id="">
            <option value="online">온라인</option>
            <option value="offline">오프라인</option>
          </select>
          <label>설명</label>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </main>
        <Footer>
          <PostBtn>등록하기</PostBtn>
        </Footer>

      </Form>
    </Wrapper >
  )
}

export default ItemPost