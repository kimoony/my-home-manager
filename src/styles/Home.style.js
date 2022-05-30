import styled from 'styled-components';


export const Wrapper = styled.div`
  width: 100%;
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`

`;

export const ThemeMode = styled.input`
  
`;

export const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

export const SignBtn = styled.button`
  margin-right: 5px;
  &:last-child {
    margin-right: 50px;
  }
`;

export const ListWrapper = styled.div`
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
  }
`;

export const AllList = styled.table`
  width: 100%;
  height: 100%;
  border: 1px solid red;
  padding: 10px 15px;
  th {
    border-bottom: 1px solid black;
  }
`;

export const RightBox = styled.div`
  width: 70vw;
  height: 400px;
  margin-right: 50px;
  button {
    margin-top: 5px;
    float: right;
  }
`;


export const TopList = styled.table`
  width: 100%;
  height: 55%;
  padding: 10px;
  border: 1px solid blue;
`;

export const BottomList = styled.table`
  width: 100%;
  height: 56%;
  padding: 10px;
  border: 1px solid green;
`;