import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService, apikey } from '../firebase';
import { useRecoilState } from 'recoil';
import { loginState, modalState } from '../atoms';
import {
  Wrapper,
  Header,
  Title,
  ThemeMode,
  BtnBox,
  SignBtn,
  ListBox,
  LeftBox,
  AllList,
  RightBox,
  TopList,
  BottomList,
  PostBtn
} from '../styles/Home.style';
import SignForm from 'components/modals/sign/SignForm';
import AlarmList from 'components/list/AlarmList';
import WishList from 'components/list/WishList';
import ItemList from 'components/list/ItemList';

const user = authService.currentUser;

function Home({ userObj, getItems, setGetItems }) {
  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [onModal, setOnModal] = useRecoilState(modalState);

  console.log(`1. ${userObj}`)
  console.log(`2. ${user}`)

  const navigate = useNavigate();

  const sessionKey = `firebase:authUser:${apikey}:[DEFAULT]`
  const session = sessionStorage.getItem(sessionKey) ? true : false;

  // console.log(session);
  useEffect(() => {
    if (session && userObj !== null) {
      setIsLogIn(true)
    }
  }, [userObj, session, setIsLogIn])

  const openModal = () => {
    setOnModal(true);
  }
  const closeModal = () => {
    setOnModal(false);
  }

  const SignOut = () => {
    setIsLogIn(false);
    // user sign out
    authService.signOut();
    alert("로그아웃 되었습니다!")
  }

  const isLogedInPost = () => {
    if (isLogIn) {
      navigate('item-post')
    } else {
      openModal()
    }
  }
  const isLogedInWish = () => {
    if (isLogIn) {
      navigate('wish-post')
    } else {
      openModal()
    }
  }

  return (
    <Wrapper>
      <Header>
        <Title>Home Manager</Title>
        {/* <ThemeMode type="checkbox" text="a" /> */}
      </Header>
      <BtnBox>
        {isLogIn ?
          <>
            <span>{userObj.displayName}님, 안녕하세요!</span>
            <SignBtn onClick={SignOut}>로그아웃</SignBtn>
            <Link to='profile'>
              <SignBtn>마이페이지</SignBtn>
            </Link>
          </>
          : (
            <SignBtn onClick={openModal}>로그인</SignBtn>
          )
        }
        <SignForm onModal={onModal} closeModal={closeModal} setIsLogIn={setIsLogIn} />
      </BtnBox>
      <ListBox>
        <LeftBox>
          <h3>전체리스트</h3>
          <AllList>
            <ItemList userObj={userObj} getItems={getItems} setGetItems={setGetItems} />
          </AllList>
          <PostBtn onClick={isLogedInPost}>등록하기</PostBtn>
        </LeftBox>
        <RightBox>
          <h3>알림리스트</h3>
          <TopList>
            <AlarmList userObj={userObj} />
          </TopList>
          <h3>위시리스트</h3>
          <BottomList>
            <WishList userObj={userObj} />
          </BottomList>
          <PostBtn onClick={isLogedInWish}>등록하기</PostBtn>
        </RightBox>
      </ListBox>
    </Wrapper>
  )
}

export default Home