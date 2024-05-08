import { CheckoutInfo } from "@/contexts/cart-context";
import { OrderStatus } from "../enum/order";
import { OrderBy, SortBy } from "../enum/sort.enum";
import { Order } from "../types/order.type";
import { ProductFormType } from "../types/product.type";
import axiosInstance from "./axios-initial";

export type OrderParamsType = {
  orderStatus?: OrderStatus;
  orderCode?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  orderBy?: string;
};

const DEFAULT_CATEGORY_PARAMS: OrderParamsType = {
  page: 1,
  limit: 5,
  orderStatus: OrderStatus.PENDING,
  sortBy: SortBy.CREATED_AT,
  orderBy: OrderBy.DESC,
};

export const fetchUserOrders = async (queryParams?: OrderParamsType) => {
  const mergedParams = { ...DEFAULT_CATEGORY_PARAMS, ...queryParams };

  const response = await axiosInstance.get(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/orders`,
    { params: mergedParams }
  );
  return response.data;
};

export const fetchOrderById = async (id: string): Promise<Order> => {
  const response = await axiosInstance.get(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/orders/${id}`
  );
  return response.data;
};

export const createOrder = async (checkoutInfo: CheckoutInfo) => {
  const response = await axiosInstance.post(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/orders/create`,
    checkoutInfo
  );
  return response.data;
};

export type PaymentUrl = {
  totalAmount: number;
  orderDescription: string;
};
export const createPaymentOnlineVNPayUrl = async (
  createPaymentUrlDto: PaymentUrl
) => {
  const response = await axiosInstance.post(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/payment/create_payment_url`,
    createPaymentUrlDto
  );
  return response.data;
};

export type UpdateOrderDto = {
  orderId: string;
  orderStatus?: OrderStatus;
  shippingAddress?: string;
  phoneNumber?: string;
};

export const updateOrder = async (data: UpdateOrderDto) => {
  const response = await axiosInstance.put(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/orders/${data.orderId}`,
    data
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to update category");
};

export const deleteProduct = async (id: string) => {
  const response = await axiosInstance.delete(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/admin/products/${id}`
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to delete product");
};
