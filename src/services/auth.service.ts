import axiosInstance from "./axios-initial";

export type UserLoginFormType = {
  email: string;
  password: string;
};
export const login = async (loginData: UserLoginFormType) => {
  const response = await axiosInstance.post(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/auth/login`,
    loginData
  );
  return response.data;
};
export const register = async (loginData: UserLoginFormType) => {
  const response = await axiosInstance.post(
    `http://${process.env.NEXT_PUBLIC_BASE_API_ENDPOINT}/api/v1/auth/register`,
    loginData
  );
  return response.data;
};
