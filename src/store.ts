import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

import { authSlice, AuthState } from "./slices/authSlice";
import { cartSlice, CartState } from "./slices/cartSlice";

type StoreState = AuthState & CartState;

export const useStore = create<StoreState>()(
  devtools(
    immer((set) => ({
      ...authSlice(set),
      ...cartSlice(set),
    })),
  ),
);
