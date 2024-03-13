"use client";

import { ProductProps } from "../../app/types/product";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: ProductProps[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    add: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    remove: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    removeAll: (state) => {
      state.cartItems.length = 0;
    },
  },
});

export const { add, remove, removeAll } = cartSlice.actions;
export default cartSlice.reducer;
