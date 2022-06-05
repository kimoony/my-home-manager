import React from 'react'
import {
  Wrapper,
  FormBox,
  Form,
  CloseBtn
} from 'styles/ItemPost.style';

function ItemPost({ closeModal, onModal }) {
  return (
    <>
      {onModal ?
        <Wrapper>
          <FormBox>
            <Form>
              <CloseBtn onClick={closeModal}>X</CloseBtn>
              ItemPost
            </Form>
          </FormBox>
        </Wrapper > : null}
    </>
  )
}

export default ItemPost