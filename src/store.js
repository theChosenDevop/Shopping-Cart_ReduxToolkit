import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Feature/Cart/cartSlice";
import modalReducer from "./Feature/Modal/ModalSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
  },
});
