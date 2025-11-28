import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";

const initialState = {
  items: cartItems,
  amount: cartItems.reduce((sum, item) => sum + item.amount, 0),
  total: cartItems.reduce(
    (total, item) => total + Number(item.price) * item.amount,
    0
  ),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
      state.amount = 0;
      state.total = 0;
    },
    increase(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.amount += 1;
        state.amount += 1;
        state.total += Number(item.price);
      }
    },
    decrease(state, action) {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.amount -= 1;

        state.total -= Number(item.price);
        state.amount -= 1;
      }
      if (item && item.amount < 1) {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    removeCart(state, action) {
      const id = action.payload;

      const item = state.items.find((item) => item.id === id);
      if (item) {
        state.amount -= item.amount;
        state.total -= Number(item.price) * item.amount;
      }
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});
export const { clearCart, increase, decrease, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
