import cartItems from "../constants/cartItems";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TcartItem } from "../types/cartItem";

interface CartState {
  cartItems: TcartItem[];
  total: number;
  amount: number;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeCart: (id: string) => void;
  clearCart: () => void;
}
const initialAmount = cartItems.reduce((acc, cur) => acc + cur.amount, 0);
const initialTotal = cartItems.reduce(
  (acc, cur) => acc + cur.amount * Number(cur.price),
  0
);
export const useCartStore = create<CartState>()(
  immer((set, _) => ({
    cartItems: cartItems,
    total: initialTotal,
    amount: initialAmount,

    increase: (id: string) => {
      set((state) => {
        const item = state.cartItems.find((i) => i.id === id);
        if (item) item.amount++;
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
          amount += item.amount;
          total += item.amount * Number(item.price);
        });
        state.amount = amount;
        state.total = total;
      });
    },

    decrease: (id: string) => {
      set((state) => {
        const item = state.cartItems.find((i) => i.id === id);
        if (!item) return;
        if (item.amount === 1) {
          state.cartItems = state.cartItems.filter((i) => i.id !== id);
        } else {
          item.amount -= 1;
        }
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
          amount += item.amount;
          total += item.amount * Number(item.price);
        });
        state.amount = amount;
        state.total = total;
      });
    },

    removeCart: (id: string) => {
      set((state) => {
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item) => {
          amount += item.amount;
          total += item.amount * Number(item.price);
        });
        state.amount = amount;
        state.total = total;
      });
    },

    clearCart: () => {
      set((state) => {
        state.cartItems = [];
        state.amount = 0;
        state.total = 0;
      });
    },
  }))
);
