import React, { Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { wishPostState } from "atoms";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import WishInputForm from "components/form/WishInputForm";
import moment from "moment";
import "moment/locale/ko";
import {
  Wrapper,
  Form,
  Header,
  Main,
  Footer,
  GoBack,
  PostBtn,
} from "styles/WishPost.style";

function WishPost({ userObj }) {
  const wishValue = useRecoilValue(wishPostState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "wishItems"), {
        products: wishValue.products,
        price: wishValue.price.toLocaleString("ko-KR"),
        descript: wishValue.descript,
        creatorId: userObj.uid,
        createDate: moment().format("YYYY-MM-DD"),
      });
      console.log("Document written with ID: ", docRef.id);
      navigate("/");
      alert("등록이 완료되었습니다.");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <h1>위시리스트 등록하기</h1>
        </Header>
        <Main>
          <WishInputForm register={register} errors={errors} />
        </Main>
        <Footer>
          <Link to="/">
            <GoBack>뒤로가기</GoBack>
          </Link>
          <PostBtn>등록하기</PostBtn>
        </Footer>
      </Form>
    </Wrapper>
  );
}

export default WishPost;
