import { Variation } from "../types/variation.type";
import axiosInstance from "./axios-initial";

export const fetchVariationNames = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get(
      `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/variations/all/names`
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export const fetchVariationById = async (id: string): Promise<Variation> => {
  try {
    const response = await axiosInstance.get(
      `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/admin/variations/${id}`
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export type CreateVariationType = {
  productId: string;
  size: string | undefined;
  availableQuantity: number | undefined;
  unitPrice: number | undefined;
  salePrice: number | undefined;
};
export const createVariation = async (variationData: CreateVariationType) => {
  try {
    const response = await axiosInstance.post(
      `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/admin/variations`,
      variationData
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};
export type UpdateVariationType = Partial<CreateVariationType> & {
  _id?: string;
};
export const updateVariation = async (data: UpdateVariationType) => {
  const response = await axiosInstance.put(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/admin/variations/${data._id}`,
    data
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to update category");
};

export type DeleteVariationPayloadType = {
  id: string;
  productId: string;
};
export const deleteVariation = async (payload: DeleteVariationPayloadType) => {
  const response = await axiosInstance.delete(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/admin/variations/${payload.id}`,
    { data: { productId: payload.productId } }
  );

  if (response.status === 200) {
    return response.data;
  }
  throw new Error("Failed to delete product");
};
