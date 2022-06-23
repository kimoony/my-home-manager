import { atom } from 'recoil';

export const writeState = atom({
  key: 'writeState',
  default: 0
})

export const loginState = atom({
  key: 'loginState',
  default: false
})