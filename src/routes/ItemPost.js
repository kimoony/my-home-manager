import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { database } from '../firebase';
import { collection, doc, addDoc } from 'firebase/firestore'
import ItemInputForm from 'components/ItemInputForm';
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

  const navigate = useNavigate();

  // const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (e) => {
    const itemsRef = collection(database, "items")
    try {
      await addDoc(doc(itemsRef, "item2"), {

      })
      navigate('/');
      alert("등록이 완료되었습니다.")
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={onSubmit}>
        <Header>
          <h1>
            물품 등록하기
          </h1>
        </Header>
        <Main>
          <ItemInputForm />
        </Main>
        <Footer>
          <Link to='/'>
            <GoBack>뒤로가기</GoBack>
          </Link>
          <PostBtn type="submit" value="등록하기" />
        </Footer>
      </Form>
    </Wrapper >
  )
}

export default ItemPost