import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService, apikey, db } from "../firebase";
import { useRecoilState } from "recoil";
import {
  getItemsState,
  getWishState,
  loginState,
  modalState,
  changedState,
} from "../atoms";
import { collection, getDocs } from "firebase/firestore";
import {
  Wrapper,
  Header,
  Title,
  // ThemeMode,
  BtnBox,
  SignBtn,
  ListBox,
  LeftBox,
  AllList,
  RightBox,
  TopList,
  BottomList,
  PostBtn,
} from "../styles/Home.style";
import SignForm from "components/modals/sign/SignForm";
import AlarmList from "components/list/AlarmList";
import WishList from "components/list/WishList";
import ItemList from "components/list/ItemList";

function Home({ userObj }) {
  const [getItems, setGetItems] = useRecoilState(getItemsState);
  const [getWish, setGetWish] = useRecoilState(getWishState);
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [onModal, setOnModal] = useRecoilState(modalState);
  const [changed, setChanged] = useRecoilState(changedState);

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
    setChanged(false);
  }, [setChanged, setGetItems]);

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
    setChanged(false);
  }, [setChanged, setGetWish]);

  useEffect(() => {
    if (session === true && userObj !== null) {
      setIsLogIn(true);
    }
  }, [userObj, session, setIsLogIn]);

  const openModal = () => {
    setOnModal(true);
  };
  const closeModal = () => {
    setOnModal(false);
  };

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
      openModal();
    }
  };
  const isLogedInWish = () => {
    if (isLogIn) {
      navigate("/wish-post");
    } else {
      openModal();
    }
  };

  return (
    <Wrapper>
      <Header>
        <Title>Home Manager</Title>
        {/* <ThemeMode type="checkbox" text="a" /> */}
      </Header>
      <BtnBox>
        {isLogIn ? (
          <>
            <span>{userObj.displayName}님, 안녕하세요!</span>
            <SignBtn onClick={SignOut}>로그아웃</SignBtn>
            <Link to="mypage">
              <SignBtn>마이페이지</SignBtn>
            </Link>
          </>
        ) : (
          <SignBtn onClick={openModal}>로그인</SignBtn>
        )}
        <SignForm
          onModal={onModal}
          closeModal={closeModal}
          setIsLogIn={setIsLogIn}
        />
      </BtnBox>
      <ListBox>
        <LeftBox>
          <h3>전체리스트</h3>
          <AllList>
            <ItemList userObj={userObj} />
          </AllList>
          <PostBtn onClick={isLogedInPost}>등록하기</PostBtn>
        </LeftBox>
        <RightBox>
          <h3>알림리스트</h3>
          <TopList>
            <AlarmList userObj={userObj} getItems={getItems} />
          </TopList>
          <h3>위시리스트</h3>
          <BottomList>
            <WishList
              userObj={userObj}
              getWish={getWish}
              changed={changed}
              setChanged={setChanged}
            />
          </BottomList>
          <PostBtn onClick={isLogedInWish}>등록하기</PostBtn>
        </RightBox>
      </ListBox>
    </Wrapper>
  );
}

export default Home;
