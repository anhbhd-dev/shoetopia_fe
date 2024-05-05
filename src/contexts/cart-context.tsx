"use client";
import {
  AddToCartPayloadType,
  RemoveFromCartPayloadType,
  addToUserCart,
  fetchUserCart,
  removeItemFromUserCart,
} from "@/services/cart.service";
import { CartAction, CartActionType, CartState } from "@/types/cart";
import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuthContext } from "./auth-context";
import { PaymentMethod, PaymentStatus } from "@/enum/order";

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  shippingFee: 0,
  shippingFeePercentage: 0,
  totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.FETCH_CART:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export type Payment = {
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
};

export const CartContext = createContext<{
  cart: CartState;
  addToCart: (item: { variationId: string; quantity: number }) => void;
  decreaseCartItem?: (item: { variationId: string; quantity?: number }) => void;
  removeFromCart: (item: RemoveFromCartPayloadType) => void;
  clearCart?: () => void;
  fetchCart?: () => void;
  updateCart?: (updatedCart: CartState) => void;
  receiverName?: string;
  phoneNumber?: string;
  shippingAddress?: string;
  payment?: Payment;
}>({
  cart: initialState,
  addToCart: () => {},
  decreaseCartItem: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  fetchCart: () => {},
  updateCart: () => {},
  receiverName: "",
  phoneNumber: "",
  shippingAddress: "",
  payment: {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuthContext();
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const addToCart = async (item: AddToCartPayloadType) => {
    try {
      const cartDataResponse = await addToUserCart(item);
      dispatch({ type: CartActionType.FETCH_CART, payload: cartDataResponse });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCart = async () => {
    const cartData = await fetchUserCart();
    dispatch({ type: CartActionType.FETCH_CART, payload: cartData });
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      fetchCart();
    }
  }, [user]);
  const removeFromCart = async (item: RemoveFromCartPayloadType) => {
    try {
      const cartDataResponse = await removeItemFromUserCart(item);
      dispatch({ type: CartActionType.FETCH_CART, payload: cartDataResponse });
    } catch (err) {
      console.log(err);
    }
  };

  // const clearCart = () => {
  //   dispatch({ type: "CLEAR_CART" });
  // };

  // const updateCart = (updatedCart: CartState) => {
  //   dispatch({ type: "UPDATE_CART", payload: updatedCart });
  //   dispatch({
  //     type: "CALCULATE_TOTALS",
  //     payload: { shippingFeePercentage: 0.1 },
  //   });
  // };

  const value = {
    cart,
    addToCart,
    fetchCart,
    removeFromCart,
    // clearCart,
    // updateCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a AuthProvider");
  }
  return context;
};
