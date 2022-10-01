import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import ItemInputForm from "components/form/ItemInputForm";
import { useRecoilValue } from "recoil";
import {
  itemCategoryState,
  itemPostState,
  quantityState,
  methodCategoryState,
} from "../atoms";
import moment from "moment";
import "moment/locale/ko";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  Wrapper,
  Form,
  Header,
  GoBack,
  Main,
  Footer,
  PostBtn,
} from "styles/ItemPost.style";

function ItemPost({ userObj }) {
  // 이미지
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const itemsValue = useRecoilValue(itemPostState);
  const quantity = useRecoilValue(quantityState);
  const itemCategory = useRecoilValue(itemCategoryState);
  const methodCategory = useRecoilValue(methodCategoryState);

  console.log(itemCategory);
  console.log(methodCategory);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "items"), {
        creatorId: userObj.uid,
        category: itemCategory,
        products: itemsValue.products,
        quantity: quantity,
        storageLocation: itemsValue.location,
        purchase: itemsValue.purchase,
        purchaseMethod: methodCategory,
        descript: itemsValue.descript,
        createDate: moment().format("YYYY-MM-DD"),
      });
      console.log(docRef.id);

      if (!file) {
        alert("Please choose a file first!");
        // return;
      }

      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
        }
      );

      if (percent === 100) {
        alert("이미지 업로드 완료");
      }

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
          <h1>물품 등록하기</h1>
        </Header>
        <Main>
          <ItemInputForm
            register={register}
            errors={errors}
            percent={percent}
            setFile={setFile}
            userObj={userObj}
          />
        </Main>
        <Footer>
          <Link to="/">
            <GoBack>뒤로가기</GoBack>
          </Link>
          <PostBtn type="submit" value="등록하기" />
        </Footer>
      </Form>
    </Wrapper>
  );
}

export default ItemPost;
