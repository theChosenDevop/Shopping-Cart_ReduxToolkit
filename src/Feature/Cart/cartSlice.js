import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from "../../cartItems";
import axios from 'axios'
const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItem", async() => {
    // () => {
//   return fetch(url)
//     .then((resp) => resp.json())
//     .catch((error) => console.log(error)); }
try{
    const resp = await axios(url);
    return resp.data
} catch (error){

}
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      // state.cartItems = []
      return { cartItems: [] };
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const add = state.cartItems.find((item) => item.id === payload);
      add.amount = add.amount + 1;
    },
    decrease: (state, { payload }) => {
      const subtract = state.cartItems.find((item) => item.id === payload);
      subtract.amount = subtract.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers:{
    [getCartItems.pending]:(state)=> {
        state.isLoading = true
    },
    [getCartItems.fulfilled]:(state,action) => {
        state.isLoading = false
        state.cartItems = action.payload;
    },
    [getCartItems.rejected]:(state) => {
        state.isLoading = false;}
  }
});
// console.log(cartSlice)

export default cartSlice.reducer;

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;
