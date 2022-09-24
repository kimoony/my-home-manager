import { atom } from "recoil";

export const writeState = atom({
  key: "writeState",
  default: 0,
});

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const userState = atom({
  key: "userState",
  default: true,
});

export const itemPostState = atom({
  key: "itemPostState",
  default: {
    category: "",
    name: "",
    quantity: 0,
    location: "",
    purchase: "",
    purchaseMethod: "",
    descript: "",
    createdAt: "",
  },
});

export const changedState = atom({
  key: "changedState",
  default: false,
});
