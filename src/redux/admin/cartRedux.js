import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "../store";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeToCart: (state, action) => {
      state.products.filter((x) => x._id !== action.payload);
    },
    clearToCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, removeToCart, clearToCart } = cartSlice.actions;
export default cartSlice.reducer;
