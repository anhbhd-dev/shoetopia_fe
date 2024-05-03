export interface Cart {
  items?: CartItem[];
  totalPrice?: number;
  shippingFee?: number;
  shippingFeePercentage?: number;
  totalAmount?: number;
}

export interface CartItem {
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
}

export interface Variation {
  _id?: string;
  size?: string;
  unitPrice?: number;
  salePrice?: number;
  availableQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  shippingFee: number;
  shippingFeePercentage: number;
  totalAmount: number;
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_CART"; payload: CartState }
  | { type: "CALCULATE_TOTALS"; payload: { shippingFeePercentage: number } };
