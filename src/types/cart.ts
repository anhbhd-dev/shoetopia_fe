export type Cart = {
  items?: CartItem[];
  totalPrice?: number;
  shippingFee?: number;
  shippingFeePercentage?: number;
  totalAmount?: number;
};

export type CartItem = {
  _id?: string;
  name?: string;
  description?: string;
  isHot?: boolean;
  avatar?: string;
  images?: string[];
  isActive?: boolean;
  variation?: Variation;
  quantity?: number;
  subTotal?: number;
};

export type Variation = {
  _id?: string;
  size?: string;
  unitPrice?: number;
  salePrice?: number;
  availableQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CartState = {
  items: CartItem[];
  totalPrice: number;
  shippingFee: number;
  shippingFeePercentage: number;
  totalAmount: number;
};

export enum CartActionType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  CLEAR_CART = "CLEAR_CART",
  FETCH_CART = "FETCH_CART",
  UPDATE_CART = "UPDATE_CART",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
  UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY",
}
export type CartAction =
  | {
      type: CartActionType.ADD_TO_CART;
      payload: { variationId: string; quantity: number };
    }
  | { type: CartActionType.REMOVE_FROM_CART; payload: { variationId: string } }
  | { type: CartActionType.CLEAR_CART }
  | {
      type: CartActionType.FETCH_CART | CartActionType.UPDATE_CART;
      payload: CartState;
    }
  | {
      type: CartActionType.DECREASE_QUANTITY;
      payload: { variationId: string; quantity: number };
    }
  | {
      type: CartActionType.UPDATE_CART_ITEM_QUANTITY;
      payload: { variationId: string; quantity: number };
    };
