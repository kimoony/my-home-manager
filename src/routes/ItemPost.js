import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore'
import ItemInputForm from 'components/ItemInputForm';
import { useRecoilState } from 'recoil';
import { nowTime } from '../atoms';
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
  const [selectCateg, setSelectCateg] = useState();
  // 물품명
  const [newName, setNewName] = useState("");
  // 수량
  const [quantity, setQuantity] = useState(0);
  // 보관 위치
  const [sLocation, setsLocation] = useState("");
  // 구매처
  const [purchase, setPurchase] = useState("");
  // 구매방법
  const [pMethod, setPMethod] = useState()
  // 설명
  const [descript, setDescript] = useState("");
  // 작성시간
  const [writeTime, setWriteTime] = useRecoilState(nowTime);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const dataId = useRef(1)

  const onSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "items"), {
        id: dataId,
        catag: selectCateg,
        name: newName,
        quantity: quantity,
        storageLocation: sLocation,
        purchase: purchase,
        pMethod: pMethod,
        descript: descript,
        createDate: writeTime,
      })
      dataId.current += 1
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
            물품 등록하기
          </h1>
        </Header>
        <Main>
          <ItemInputForm
            register={register}
            errors={errors}
            selectCateg={selectCateg}
            setSelectCateg={setSelectCateg}
            setNewName={setNewName}
            quantity={quantity}
            setQuantity={setQuantity}
            setsLocation={setsLocation}
            setPurchase={setPurchase}
            setPMethod={setPMethod}
            setDescript={setDescript}
          />
        </Main>
        <Footer>
          <Link to='/'>
            <GoBack>뒤로가기</GoBack>
          </Link>
          <PostBtn type='submit' value="등록하기" />
        </Footer>
      </Form>
    </Wrapper >
  )
}

export default ItemPost