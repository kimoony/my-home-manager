import { atom } from 'recoil';
import moment from 'moment';
import 'moment/locale/ko';


export const writeState = atom({
  key: 'writeState',
  default: 0
})

export const loginState = atom({
  key: 'loginState',
  default: false
})

export const nowTime = atom({
  key: 'nowTime',
  default: moment().format('YYYY-MM-DD HH:mm:ss')
})