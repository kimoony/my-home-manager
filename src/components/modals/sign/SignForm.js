import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { authService } from '../../../firebase';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Wrapper,
  FormBox,
  Form,
  CloseBtn,
  Title,
  InputBox,
  Input,
  ToggleBtn
} from 'styles/SignForm.style';
import Auth from './Auth';
import { useRecoilState } from 'recoil';
import { userState } from 'atoms';

console.log(authService)

function SignForm({ closeModal, onModal, setIsLogIn }) {


  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [newUser, setNewUser] = useRecoilState(userState);


  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const password = useRef();
  password.current = watch("password");


  const toggleSign = () => setNewUser(prev => !prev);

  const onSubmit = async (data) => {
    console.log(data)
    let user;
    try {
      if (newUser) {
        user = await createUserWithEmailAndPassword(
          authService, data.email, data.password
        )
        setNewUser(false)
      } else {
        setPersistence(authService, browserSessionPersistence)
        user = await signInWithEmailAndPassword(
          authService, data.email, data.password
        )
        closeModal();
        setIsLogIn(true);
        alert("로그인 완료!")
      }
      console.log(user)
    } catch (error) {
      setErrorFromSubmit(error.message)
      // console.error(error.message);
    }
  }


  return (
    <>
      {onModal ? (
        <Wrapper>
          <FormBox>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <CloseBtn onClick={closeModal}>X</CloseBtn>
              </div>
              <Title>
                {
                  newUser ? "회원가입" : "로그인"
                }
              </Title>
              <InputBox>
                <Input
                  name="email"
                  type="email"
                  placeholder='이메일'
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
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
                  placeholder='비밀번호 8자리 이상' />
                {errors.password && errors.password.type === "required" && (
                  <p>비밀번호는 반드시 입력해야합니다.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p>비밀번호는 6글자 이상이여야 합니다.</p>
                )}
                {newUser ?
                  (<Input
                    name="passwordConfirm"
                    type="password"
                    {...register("passwordConfirm", {
                      required: true,
                      validate: (value) => value === password.current,
                    })}
                    placeholder='비밀번호를 재입력' />) : null}
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
            <ToggleBtn onClick={toggleSign}>{newUser ? "가입했다면? ☛☛ 로그인하기" : "회원가입 하러 가기.."}</ToggleBtn>
            <Auth closeModal={closeModal} setIsLogIn={setIsLogIn} />
          </FormBox>
        </Wrapper>
      ) : null}
    </>
  )
}

export default SignForm