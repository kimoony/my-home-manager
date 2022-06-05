import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, .3);
`;

export const FormBox = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-height: 80%;
  width: 20rem;
  height: 80%;
  padding: 16px;
  background: rgb(25, 31, 44);
  border-radius: 10px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const CloseBtn = styled.button`
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: rgb(25, 31, 44);
  float: right;
  margin-bottom: 20px;
`;