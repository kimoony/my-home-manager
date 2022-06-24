import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../firebase';
import { useRecoilState } from 'recoil';
import { loginState } from '../atoms';
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
import ItemPost from 'routes/ItemPost';
import WishPost from 'routes/WishPost';
import { onAuthStateChanged } from 'firebase/auth';



function Home() {

  const [isLogIn, setIsLogIn] = useRecoilState(loginState);
  const [onModal, setOnModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLogIn(true);
      }
    })
  }, [])

  useEffect(() => {

  }, [])

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
        {isLogIn ? (
          <>
            <SignBtn onClick={SignOut}>로그아웃</SignBtn>
            <Link to='profile'>
              <SignBtn>마이페이지</SignBtn>
            </Link>
          </>
        ) : (
          <SignBtn onClick={openModal}>회원가입</SignBtn>
        )
        }
        <SignForm onModal={onModal} closeModal={closeModal} setIsLogIn={setIsLogIn} />
      </BtnBox>
      <ListBox>
        <LeftBox>
          <h3>전체리스트</h3>
          <AllList>
            <ItemList />
          </AllList>
          <PostBtn onClick={isLogedInPost}>등록하기</PostBtn>
        </LeftBox>
        <RightBox>
          <h3>알림리스트</h3>
          <TopList>
            <AlarmList />
          </TopList>
          <h3>위시리스트</h3>
          <BottomList>
            <WishList />
          </BottomList>
          <PostBtn onClick={isLogedInWish}>등록하기</PostBtn>
        </RightBox>
      </ListBox>
    </Wrapper>
  )
}

export default Home