import styled from "styled-components";

export const FormBox = styled.div`
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  max-height: 80%;
  width: 20rem;
  padding: 16px;
  text-align: center;
`;

export const Form = styled.form`
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

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;

  span {
    align-self: flex-start;
    color: red;
    margin: 5px 0px;
  }
`;

export const Input = styled.input`
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

export const ToggleBtn = styled.div`
  margin: 10px 0;
  color: #667078;
  cursor: pointer;

  :hover {
    font-weight: bold;
  }
`;
