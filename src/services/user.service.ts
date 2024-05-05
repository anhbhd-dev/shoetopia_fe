import { User } from "../types/order.type";
import axiosInstance from "./axios-initial";

export const fetchUserProfile = async (): Promise<User | undefined> => {
  try {
    const response = await axiosInstance.get(
      `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/users/profile`
    );
    return response.data;
  } catch (error) {
    throw Error(error as string);
  }
};

export const updateUserInfo = async (
  data: Partial<User>
): Promise<User | undefined> => {
  const response = await axiosInstance.put(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/users/${data._id}`,
    data
  );
  return response.data;
};

export type updatePasswordType = {
  password: string;
  newPassword: string;
  _id: string;
};

export const updateUserPassword = async (data: updatePasswordType) => {
  const response = await axiosInstance.put(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/users/password/${data._id}`,
    data
  );

  return response.data;
};

export type DeleteVariationPayloadType = {
  id: string;
  productId: string;
};
export const deleteVariation = async (payload: DeleteVariationPayloadType) => {
  const response = await axiosInstance.delete(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/variations/${payload.id}`,
    { data: { productId: payload.productId } }
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to delete product");
};
