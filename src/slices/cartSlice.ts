interface CartItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  totalPrice: number;
  increaseQuantity: (product: CartItem) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  resetCart: () => void;
}

export const cartSlice = (
  set: (fn: (state: CartState) => void) => void,
): CartState => ({
  cart: [],
  totalPrice: 0,
  increaseQuantity: (product: CartItem) => {
    set((state) => {
      const existingProduct = state.cart.find(
        (item) => item._id === product._id,
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        state.cart.push(product);
      }
      state.totalPrice = state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    });
  },
  decreaseQuantity: (id: string) => {
    set((state) => {
      const product = state.cart.find((item) => item._id === id);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item._id !== id);
        }
        state.totalPrice = state.cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      }
    });
  },
  removeFromCart: (id: string) => {
    set((state) => {
      state.cart = state.cart.filter((item) => item._id !== id);
      state.totalPrice = state.cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
    });
  },
  resetCart: () => {
    set((state) => {
      state.cart = [];
      state.totalPrice = 0;
    });
  },
});
