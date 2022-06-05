import React from 'react';
import {
  Wrapper,
  FormBox,
  Form,
  CloseBtn
} from 'styles/WishPost.style';

function WishPost({ closeModal, onModal }) {
  return (
    <>
      {onModal ?
        <Wrapper>
          <FormBox>
            <Form>
              <CloseBtn onClick={closeModal}>X</CloseBtn>
              WishPost
            </Form>
          </FormBox>
        </Wrapper> : null}
    </>
  )
}

export default WishPost