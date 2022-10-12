import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService, apikey, db } from "../firebase";
import { useRecoilState } from "recoil";
import {
  getItemsState,
  getWishState,
  loginState,
  changedState,
} from "../atoms";
import { collection, getDocs } from "firebase/firestore";
import AlarmList from "components/list/AlarmList";
import WishList from "components/list/WishList";
import ItemList from "components/list/ItemList";
import styled from "styled-components";
import Nav from "components/Nav";

function Home({ userObj }) {
  const [getItems, setGetItems] = useRecoilState(getItemsState);
  const [getWish, setGetWish] = useRecoilState(getWishState);
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [change, setChange] = useRecoilState(changedState);

  const navigate = useNavigate();

  const sessionKey = `firebase:authUser:${apikey}:[DEFAULT]`;
  const session = sessionStorage.getItem(sessionKey) ? true : false;

  useEffect(() => {
    const getItemData = async () => {
      const data = await getDocs(collection(db, "items"));
      setGetItems(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getItemData();
    setChange(false);
  }, [change, getItems]);

  useEffect(() => {
    const getWishData = async () => {
      const data = await getDocs(collection(db, "wishItems"));
      setGetWish(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getWishData();
    setChange(false);
  }, [change, getWish]);

  useEffect(() => {
    if (session === true && userObj !== null) {
      setIsLogIn(true);
    }
  }, [userObj, session, setIsLogIn]);

  const SignOut = () => {
    setIsLogIn(false);
    // user sign out
    authService.signOut();
    alert("로그아웃 되었습니다!");
  };

  const isLogedInPost = () => {
    if (isLogIn) {
      navigate("/item-post");
    } else {
      navigate("/sign");
    }
  };
  const isLogedInWish = () => {
    if (isLogIn) {
      navigate("/wish-post");
    } else {
      navigate("/sign");
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>Home Manager</Title>
        {/* <ThemeMode type="checkbox" text="a" /> */}
      </Header>
      <NavBox>
        <Nav isLogIn={isLogIn} SignOut={SignOut} userObj={userObj} />
      </NavBox>
      <ListContainer>
        <LeftBox>
          <Subtitle>
            아이템리스트
            <div>
              <PostBtn onClick={isLogedInPost}>등록하기</PostBtn>
            </div>
          </Subtitle>
          <MainList>
            <ItemList userObj={userObj} />
          </MainList>
        </LeftBox>
        <RightBox>
          <Subtitle>알림</Subtitle>
          <TopList>
            <AlarmList userObj={userObj} />
          </TopList>
          <Subtitle>
            위시리스트
            <span>
              <PostBtn onClick={isLogedInWish}>등록하기</PostBtn>
            </span>
          </Subtitle>
          <BottomList>
            <WishList userObj={userObj} />
          </BottomList>
        </RightBox>
      </ListContainer>
    </Wrapper>
  );
}

export default Home;

// styled-components

const Wrapper = styled.section`
  width: 100%;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3rem;
`;

// const ThemeMode = styled.input``;

const NavBox = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  padding-left: 20px;
`;

const ListContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: 20px;
`;

const Subtitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftBox = styled.section`
  width: 100%;
  height: 505px;
  margin-right: 10px;
  button {
    margin-top: 5px;
    float: right;
    margin-right: 10px;
  }
`;

const MainList = styled.section`
  width: 95%;
  height: 100%;
  border: 1px solid red;
  padding: 10px 15px;
  border-radius: 10px;
`;

const RightBox = styled.section`
  width: 70vw;
  height: 400px;
  margin-right: 50px;
  margin-top: 7px;

  button {
    margin-top: 5px;
    float: right;
    margin-right: -15px;
  }
`;

const TopList = styled.section`
  width: 100%;
  height: 40%;
  padding: 10px;
  margin-top: 25px;
  border: 1px solid blue;
  border-radius: 10px;
`;

const BottomList = styled.section`
  width: 100%;
  height: 62.3%;
  padding: 10px;
  border: 1px solid green;
  border-radius: 10px;
`;

const PostBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #2986f5;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  margin-bottom: 5px;
`;
