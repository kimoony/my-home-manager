import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1``;

export const ThemeMode = styled.input``;

export const BtnBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const SignBtn = styled.button`
  margin-right: 30px;
  float: right;
  cursor: pointer;
`;

export const ListBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 20px;
`;

export const LeftBox = styled.div`
  width: 100vw;
  height: 505px;
  margin-right: 10px;
  button {
    margin-top: 5px;
    float: right;
    margin-right: 10px;
  }
`;

export const MainList = styled.div`
  width: 95%;
  height: 100%;
  border: 1px solid red;
  padding: 10px 15px;
`;

export const RightBox = styled.div`
  width: 70vw;
  height: 400px;
  margin-right: 50px;
  button {
    margin-top: 5px;
    float: right;
    margin-right: -15px;
  }
`;

export const TopList = styled.div`
  width: 100%;
  height: 50%;
  padding: 10px;
  border: 1px solid blue;
`;

export const BottomList = styled.div`
  width: 100%;
  height: 55.7%;
  padding: 10px;
  border: 1px solid green;
`;

export const PostBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #2986f5;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
`;
