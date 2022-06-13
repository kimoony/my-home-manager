import React from 'react';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import WishInputForm from 'components/WishInputForm'
import {
  Wrapper,
  Form,
  Header,
  Main,
  Footer,
  GoBack,
  PostBtn
} from 'styles/WishPost.style';

function WishPost() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = () => {

  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <h1>
            위시리스트 등록하기
          </h1>
        </Header>
        <Main>
          <WishInputForm />
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

export default WishPost