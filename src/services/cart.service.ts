import { CartState } from "@/types/cart";
import axiosInstance from "./axios-initial";

export const fetchUserCart = async (): Promise<CartState> => {
  try {
    const response = await axiosInstance.get(
      `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/cart`
    );
    return response.data;
  } catch (error) {
    throw Error(error as string);
  }
};
export type AddToCartPayloadType = {
  variationId: string;
  quantity?: number;
};
export const addToUserCart = async (
  data: AddToCartPayloadType
): Promise<CartState> => {
  const response = await axiosInstance.post(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/cart/add-item`,
    data
  );
  return response.data;
};
export const updateToUserCart = async (
  data: AddToCartPayloadType
): Promise<CartState> => {
  const response = await axiosInstance.post(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/cart/update-item`,
    data
  );
  return response.data;
};
export type RemoveFromCartPayloadType = Partial<AddToCartPayloadType>;
export const removeItemFromUserCart = async (
  data: Partial<RemoveFromCartPayloadType>
): Promise<CartState> => {
  const response = await axiosInstance.delete(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/cart/remove-item`,
    {
      data,
    }
  );
  return response.data;
};

// export type updatePasswordType = {
//   password: string;
//   newPassword: string;
//   _id: string;
// };

// export const updateUserPassword = async (data: updatePasswordType) => {
//   const response = await axiosInstance.put(
//     `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/users/password/${data._id}`,
//     data
//   );

//   return response.data;
// };

// export type DeleteVariationPayloadType = {
//   id: string;
//   productId: string;
// };
// export const deleteVariation = async (payload: DeleteVariationPayloadType) => {
//   const response = await axiosInstance.delete(
//     `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/variations/${payload.id}`,
//     { data: { productId: payload.productId } }
//   );

//   if (response.status === 200) {
//     return response.data;
//   }
//   throw new Error("Failed to delete product");
// };
