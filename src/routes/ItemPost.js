import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import ItemInputForm from "components/form/postInput/ItemInputForm";
import { useRecoilState } from "recoil";
import { itemPostState, quantityState } from "../atoms";
import moment from "moment";
import "moment/locale/ko";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import styled from "styled-components";

function ItemPost({ userObj }) {
  // 이미지
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [percent, setPercent] = useState(0);
  const [itemsValue, setItemsValue] = useRecoilState(itemPostState);
  const [quantity, setQuantity] = useRecoilState(quantityState);

  const [categoryValue, setCatagoryValue] = useState("");
  const [methodValue, setMethodValue] = useState("온라인");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      if (!file) {
        alert("이미지를 선택하세요!");
        return;
      }

      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgUrl(url);
          });
        }
      );

      if (percent === 100) {
        const docRef = await addDoc(collection(db, "items"), {
          creatorId: userObj.uid,
          category: categoryValue,
          products: itemsValue.products,
          quantity: quantity,
          storageLocation: itemsValue.location,
          purchase: itemsValue.purchase,
          purchaseMethod: methodValue,
          descript: itemsValue.descript,
          createDate: moment().format("YYYY-MM-DD"),
          productsImg: imgUrl,
        });
        console.log(docRef.id);

        setItemsValue({
          products: "",
          location: "",
          purchase: "",
          descript: "",
          createdAt: "",
        });
        setQuantity(0);
        navigate("/");
        alert("이미 업로드 완료");
        alert("등록이 완료되었습니다.");
      }
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
            categoryValue={categoryValue}
            setCatagoryValue={setCatagoryValue}
            methodValue={methodValue}
            setMethodValue={setMethodValue}
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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 90vw;
  height: 90vh;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
`;

const PostBtn = styled.input`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #2986f5;
  color: #fff;
  cursor: pointer;
`;

export const GoBack = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #f9567a;
  color: #fff;
  margin-right: 20px;
  cursor: pointer;
`;
