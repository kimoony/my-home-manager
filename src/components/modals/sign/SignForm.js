import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { authService } from "../../../firebase";
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Auth from "./Auth";
import { useRecoilState } from "recoil";
import { loginState, userState } from "atoms";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import styled from "styled-components";

// console.log(authService)

function SignForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [newUser, setNewUser] = useRecoilState(userState);

  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const password = useRef();
  password.current = watch("password");

  const navigate = useNavigate();

  const toggleSign = () => setNewUser((prev) => !prev);

  const goBack = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const onSubmit = async (data) => {
    console.log(data);
    let user;
    try {
      if (newUser) {
        user = await createUserWithEmailAndPassword(
          authService,
          data.email,
          data.password
        );
        setNewUser(false);
      } else {
        setPersistence(authService, browserSessionPersistence);
        user = await signInWithEmailAndPassword(
          authService,
          data.email,
          data.password
        );
        setIsLogIn(true);
        alert("로그인 완료!");
        navigate("/");
      }
      console.log(user);
    } catch (error) {
      setErrorFromSubmit(error.message);
    }
  };

  return (
    <>
      <FormBox>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <BackBtn type="button" onClick={goBack}>
            <BiArrowBack />
          </BackBtn>
          <h1>{newUser ? "회원가입" : "로그인"}</h1>
          <InputBox>
            <Input
              name="email"
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
            {errors.email && errors.email.type === "required" && (
              <p>이메일은 반드시 입력해야합니다.</p>
            )}
            {errors.email && errors.email.type === "pattern" && (
              <p>이메일이 형식에 맞지 않습니다.</p>
            )}
            <Input
              name="password"
              type="password"
              {...register("password", { required: true, minLength: 8 })}
              minLength={8}
              placeholder="비밀번호 8자리 이상"
            />
            {errors.password && errors.password.type === "required" && (
              <p>비밀번호는 반드시 입력해야합니다.</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p>비밀번호는 6글자 이상이여야 합니다.</p>
            )}
            {newUser ? (
              <Input
                name="passwordConfirm"
                type="password"
                {...register("passwordConfirm", {
                  required: true,
                  validate: (value) => value === password.current,
                })}
                placeholder="비밀번호를 재입력"
              />
            ) : null}
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === "required" && (
                <p>비밀번호 확인은 반드시 입력해야합니다.</p>
              )}
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === "validate" && (
                <p>비밀번호가 일치하지 않습니다.</p>
              )}
            {errorFromSubmit && <p>{errorFromSubmit}</p>}
            <Input type="submit" value={newUser ? "회원가입" : "로그인"} />
          </InputBox>
        </Form>
        <ToggleBtn onClick={toggleSign}>
          {newUser ? "로그인 하러 가기.." : "회원가입 하러 가기.."}
        </ToggleBtn>
        <Auth setIsLogIn={setIsLogIn} />
      </FormBox>
    </>
  );
}

export default SignForm;

const FormBox = styled.div`
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  max-height: 80%;
  width: 20rem;
  padding: 16px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const BackBtn = styled.button`
  border: none;
  background-color: #fff;
  border-radius: 5px;
  align-self: flex-start;
  font-size: 18px;
  cursor: pointer;

  :hover {
    font-weight: bold;
    color: #616365;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    align-self: flex-start;
    color: red;
    margin: 5px 0px;
  }
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 0 5px;
  height: 1.5rem;
  font-size: 1.2rem;
  border-radius: 5px;
  border: 1px solid #616365;

  :last-child {
    border: none;
    border-radius: 5px;
    padding: 5px 0;
    height: 2rem;
    background-color: #616365;
    color: #fff;
    cursor: pointer;
    margin-top: 5px;

    :hover {
      background-color: #667078;
    }
  }
`;

const ToggleBtn = styled.div`
  margin: 10px 0;
  color: #667078;
  cursor: pointer;

  :hover {
    font-weight: bold;
  }
`;
