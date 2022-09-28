import { atom } from "recoil";

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
    products: "",
    location: "",
    purchase: "",
    purchaseMethod: "",
    descript: "",
    createdAt: "",
  },
});

export const quantityState = atom({
  key: "quantityState",
  default: 0,
});

export const wishPostState = atom({
  key: "wishPostState",
  category: "",
  products: "",
  price: 0,
  descript: "",
});

export const changedState = atom({
  key: "changedState",
  default: false,
});

export const getItemsState = atom({
  key: "getItemsState",
  default: [],
});

export const getWishState = atom({
  key: "getWishState",
  default: [],
});
