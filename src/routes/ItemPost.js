import ItemInputList from 'components/ItemInputList';
import React from 'react'
import { Link } from 'react-router-dom';
import {
  Wrapper,
  Form,
  Header,
  GoBack,
  Main,
  Footer,
  PostBtn,
} from 'styles/ItemPost.style';

function ItemPost() {
  return (
    <Wrapper>
      <Form>
        <Header>
          <h1>
            물품 등록하기
          </h1>
        </Header>
        <Main>
          <ItemInputList />
        </Main>
        <Footer>
          <Link to='/'>
            <GoBack>뒤로가기</GoBack>
          </Link>
          <PostBtn>등록하기</PostBtn>
        </Footer>
      </Form>
    </Wrapper >
  )
}

export default ItemPost