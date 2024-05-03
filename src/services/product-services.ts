import { OrderBy, SortBy } from "../enum/sort.enum";
import { Product, ProductFormType } from "../types/product.type";
import axiosInstance from "./axios-initial";

export type ProductParamsType = {
  name?: string;
  page?: number;
  categories?: string;
  limit?: number;
  isHot?: boolean;
  sortBy?: string;
  orderBy?: string;
};

const DEFAULT_CATEGORY_PARAMS: ProductParamsType = {
  page: 1,
  limit: 5,
  sortBy: SortBy.CREATED_AT,
  orderBy: OrderBy.DESC,
};

export const fetchProducts = async (queryParams?: ProductParamsType) => {
  try {
    const mergedParams = { ...DEFAULT_CATEGORY_PARAMS, ...queryParams };

    const response = await axiosInstance.get(
      `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/products`,
      { params: mergedParams }
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axiosInstance.get(
      `http://${process.env.VITE_BASE_API_ENDPOINT}/api/v1/admin/products/${id}`
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export const createProduct = async (productData: ProductFormType) => {
  try {
    const response = await axiosInstance.post(
      `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/admin/products`,
      productData
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi
    throw new Error(error as string);
  }
};

export type UpdateProductDataType = Partial<ProductFormType> & {
  productId: string;
};
export const updateProduct = async (data: UpdateProductDataType) => {
  const response = await axiosInstance.put(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/admin/products/${data.productId}`,
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

export interface ProductFetched {
  _id?: string;
  name?: string;
  description?: string;
  isHot?: boolean;
  avatar?: string;
  images?: string[];
  category?: Category;
  isActive?: boolean;
  variations?: Variation[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  isShowAtHomePage?: boolean;
}

export interface Variation {
  _id?: string;
  size?: string;
  unitPrice?: number;
  salePrice?: number;
  availableQuantity?: number;
  createdAt?: string;
  updatedAt?: string;
}
