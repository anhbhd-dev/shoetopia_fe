// CartContext.tsx
import { createContext, useReducer } from "react";
import { CartAction, CartState } from "./types";

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  shippingFee: 0,
  shippingFeePercentage: 0,
  totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Xử lý logic thêm sản phẩm vào giỏ hàng
      return {
        ...state,
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + action.payload.subTotal,
      };
    case "REMOVE_FROM_CART":
      // Xử lý logic xóa sản phẩm khỏi giỏ hàng
      return state;
    case "CLEAR_CART":
      // Xử lý logic xóa tất cả sản phẩm khỏi giỏ hàng
      return initialState;
    case "UPDATE_CART":
      // Xử lý logic cập nhật giỏ hàng
      return action.payload;
    case "CALCULATE_TOTALS":
      // Tính toán totalPrice, shippingFee, và totalAmount
      const { shippingFeePercentage } = action.payload;
      const totalPrice = state.items.reduce(
        (total, item) => total + item.subTotal,
        0
      );
      const shippingFee = totalPrice * shippingFeePercentage;
      const totalAmount = totalPrice + shippingFee;

      return {
        ...state,
        totalPrice,
        shippingFee,
        totalAmount,
      };
    default:
      return state;
  }
};

export const CartContext = createContext<{
  cart: CartState;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateCart: (updatedCart: CartState) => void;
}>({
  cart: initialState,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    dispatch({
      type: "CALCULATE_TOTALS",
      payload: { shippingFeePercentage: 0.1 },
    });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
    dispatch({
      type: "CALCULATE_TOTALS",
      payload: { shippingFeePercentage: 0.1 },
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const updateCart = (updatedCart: CartState) => {
    dispatch({ type: "UPDATE_CART", payload: updatedCart });
    dispatch({
      type: "CALCULATE_TOTALS",
      payload: { shippingFeePercentage: 0.1 },
    });
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
