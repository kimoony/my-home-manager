import React from 'react'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import ItemInputList from 'components/ItemInputList';
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

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = () => {

  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
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