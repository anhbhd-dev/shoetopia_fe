import axiosInstance from "./axios-initial";

export const checkIsAlreadyRated = async (productId: string) => {
  const response = await axiosInstance.get(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/reviews/check-existed-review/${productId}`
  );
  return response.data;
};

export type CreateReviewDto = {
  content: string;

  productId: string;
  rating: number;
};
export const addReview = async (createReviewDto: CreateReviewDto) => {
  const response = await axiosInstance.post(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/reviews`,
    createReviewDto
  );
  return response.data;
};
