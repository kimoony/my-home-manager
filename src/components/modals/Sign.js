import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Wrapper, FormBox, Form, CloseBtn, InputBox, ToggleBtn } from '../../styles/Sign.style';

function Sign({ closeModal, onModal }) {
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => setNewAccount(prev => !prev);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example"));

  return (
    <>
      {onModal ? (
        <Wrapper>
          <FormBox>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <CloseBtn onClick={closeModal}>X</CloseBtn>
              </div>
              <InputBox>
                <input defaultValue="test" {...register("example")} />

                <input {...register("exampleRequired", { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
              </InputBox>
            </Form>
            <ToggleBtn onClick={toggleAccount}>{newAccount ? "가입했다면? ☛☛ 로그인하기" : "가입전이면? ☛☛  회원가입하기"}</ToggleBtn>
          </FormBox>
        </Wrapper>
      ) : null}
    </>
  )
}

export default Sign