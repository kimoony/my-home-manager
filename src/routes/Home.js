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
import {
  Wrapper,
  Header,
  Title,
  // ThemeMode,
  BtnBox,
  SignBtn,
  ListBox,
  LeftBox,
  MainList,
  RightBox,
  TopList,
  BottomList,
  PostBtn,
} from "../styles/Home.style";
import AlarmList from "components/list/AlarmList";
import WishList from "components/list/WishList";
import ItemList from "components/list/ItemList";

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
          <SignBtn onClick={() => navigate("/sign")}>로그인</SignBtn>
        )}
      </BtnBox>
      <ListBox>
        <LeftBox>
          <h3>
            아이템리스트
            <span>
              <PostBtn onClick={isLogedInPost}>등록하기</PostBtn>
            </span>
          </h3>
          <MainList>
            <ItemList userObj={userObj} />
          </MainList>
        </LeftBox>
        <RightBox>
          <h3>알림</h3>
          <TopList>
            <AlarmList userObj={userObj} />
          </TopList>
          <h3>
            위시리스트
            <span>
              <PostBtn onClick={isLogedInWish}>등록하기</PostBtn>
            </span>
          </h3>
          <BottomList>
            <WishList userObj={userObj} />
          </BottomList>
        </RightBox>
      </ListBox>
    </Wrapper>
  );
}

export default Home;
