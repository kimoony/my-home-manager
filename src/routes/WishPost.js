import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil';
import { nowTime } from '../atoms';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore'
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

function WishPost({ userObj }) {
  const [wCateg, setWCateg] = useState();
  const [wItemName, setWItemName] = useState("");
  const [price, setPrice] = useState(0);
  const [wDesc, setWDesc] = useState("")
  const writeTime = useRecoilValue(nowTime);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const wDataId = useRef(1)
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "wishItems"), {
        id: wDataId,
        catag: wCateg,
        name: wItemName,
        price: price.toLocaleString('ko-KR'),
        descript: wDesc,
        createDate: writeTime,
        creatorId: userObj.uid,
      })
      wDataId.current += 1
      console.log("Document written with ID: ", docRef.id);
      navigate('/');
      alert("등록이 완료되었습니다.")
    } catch (error) {
      console.error(error.message);
    }
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
          <WishInputForm
            register={register}
            errors={errors}
            wCateg={wCateg}
            setWCateg={setWCateg}
            setWItemName={setWItemName}
            price={price}
            setPrice={setPrice}
            setWDesc={setWDesc}
          />
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