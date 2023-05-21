import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addItem: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeItem: (state, action) => {
      console.log(action.payload);
      state.cartItems.splice(action.payload, 1);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
