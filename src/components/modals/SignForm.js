import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { authService } from '../../firebase';
import {
  Wrapper,
  FormBox,
  Form,
  CloseBtn,
  Title,
  InputBox,
  Input,
  ToggleBtn
} from '../../styles/SignForm.style';
import Auth from './Auth';

function SignForm({ closeModal, onModal }) {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [newAccount, setNewAccount] = useState(true); // 전역관리
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const password = useRef();
  password.current = watch("password");


  const toggleAccount = () => setNewAccount(prev => !prev);

  const onSubmit = async (data) => {
    console.log(data)
    try {
      if (newAccount) {
        await authService
          .auth()
          .createUserWithEmailAndPassword(
            data.email, data.password
          )
      } else {
        await authService
          .auth()
          .signInWithEmailAndPassword(
            data.email, data.password
          )
      }

    } catch (error) {
      setErrorFromSubmit(error.message)
      console.error(error.message);
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
                  newAccount ? "회원가입" : "로그인"
                }
              </Title>
              <InputBox>
                <Input
                  name="email"
                  type="email"
                  placeholder='이메일'
                  {...register({ required: true, pattern: /^\S+@\S+$/i })}
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
                  {...register({ required: true, minLength: 8 })}
                  minLength={8}
                  placeholder='비밀번호 8자리 이상' />
                {errors.password && errors.password.type === "required" && (
                  <p>비밀번호는 반드시 입력해야합니다.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <p>비밀번호는 6글자 이상이여야 합니다.</p>
                )}
                {newAccount ?
                  (<Input
                    name="password"
                    type="password"
                    {...register({
                      required: true,
                      validate: (value) => value === password.current,
                    })}
                    placeholder='비밀번호를 재입력' />) : null}
                {errors.password_confirm &&
                  errors.password_confirm.type === "required" && (
                    <p>비밀번호 확인은 반드시 입력해야합니다.</p>
                  )}
                {errors.password_confirm &&
                  errors.password_confirm.type === "validate" && (
                    <p>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>
                  )}

                {errorFromSubmit && <p>{errorFromSubmit}</p>}

                <Input type="submit" value={newAccount ? "회원가입" : "로그인"} />
              </InputBox>
            </Form>
            <ToggleBtn onClick={toggleAccount}>{newAccount ? "가입했다면? ☛☛ 로그인하기" : "회원가입 하러 가기.."}</ToggleBtn>
            <Auth />
          </FormBox>
        </Wrapper>
      ) : null}
    </>
  )
}

export default SignForm