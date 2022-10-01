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
    products: "",
    location: "",
    purchase: "",
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
  default: {
    products: "",
    price: 0,
    descript: "",
  },
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

export const itemCategoryState = atom({
  key: "itemCategoryState",
  default: [],
});

export const methodCategoryState = atom({
  key: "methodCategoryState",
  default: ["온라인", "오프라인", "기타"],
});

export const wishCategoryState = atom({
  key: "itemCategoryState",
  default: [],
});
