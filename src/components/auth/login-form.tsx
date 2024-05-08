"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import Yup for validation

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useAppContext } from "@/contexts/app-context";
import { UserLoginFormType, login } from "@/services/auth.service";
import { fetchUserProfile } from "@/services/user.service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { UserData, useAuthContext } from "@/contexts/auth-context";
export type LoginSuccessResponse = {
  accessToken: string;
  refreshToken: string;
};
export function LoginForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  const { isOpenLoginForm, closeLoginForm, openSignUpForm } = useAppContext();
  const { setUser, user } = useAuthContext();
  const handleSubmitForm = async (values: UserLoginFormType) => {
    try {
      const loginRes: LoginSuccessResponse = await login(values);

      if (loginRes) {
        // TODO: Save accessToken to localStorage
        localStorage.setItem("accessToken", loginRes.accessToken);
        localStorage.setItem("refreshToken", loginRes.refreshToken);
        const userDataResponse = await fetchUserProfile();

        setUser({
          isAuthenticated: true,
          ...userDataResponse,
        } as UserData);
        closeLoginForm();
        return toast.success("Đăng nhập thành công.", {
          duration: 2000,
          style: {
            background: "#fff",
          },
          iconTheme: {
            primary: "#61d345",
            secondary: "#fff",
          },
        });
      }
    } catch (err) {
      if ((err as AxiosError).response?.status === 404) {
        return toast.error("Không tồn tại người dùng với email này.", {
          duration: 2000,
          style: {
            background: "#fff",
          },
        });
      }

      if (
        (err as AxiosError).response?.status === 401 &&
        ((err as AxiosError).response?.data as any).message ===
          "Password incorrect"
      ) {
        return toast.error("Email hoặc mật khẩu không đúng.", {
          duration: 2000,
          style: {
            background: "#fff",
          },
        });
      }

      return toast.error("Đã có lỗi xảy ra.", {
        duration: 2000,
        style: {
          background: "#fff",
        },
      });
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Bắt buộc phải nhập email"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Bắt buộc phải nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  return (
    <Dialog open={isOpenLoginForm} size="xs" handler={closeLoginForm}>
      <DialogBody>
        <section className="grid text-center items-center p-2 ">
          <div>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Đăng nhập
            </Typography>
            <Typography className="mb-8 text-gray-600 font-normal text-[18px]">
              Enter your email and password to sign in
            </Typography>
            <form
              onSubmit={formik.handleSubmit}
              className="mx-auto max-w-[24rem] text-left"
            >
              <div className="mb-6">
                <label htmlFor="email">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Email
                  </Typography>
                </label>
                <Input
                  id="email"
                  color="gray"
                  size="lg"
                  type="email"
                  name="email"
                  variant="standard"
                  placeholder="name@mail.com"
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  labelProps={{
                    className: "hidden",
                  }}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="mb-6">
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Password
                  </Typography>
                </label>
                <Input
                  size="lg"
                  placeholder="********"
                  variant="standard"
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                  type={passwordShown ? "text" : "password"}
                  icon={
                    <i onClick={togglePasswordVisibility}>
                      {passwordShown ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </i>
                  }
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <Button
                type="submit"
                color="gray"
                size="lg"
                className="mt-6"
                fullWidth
                loading={formik.isSubmitting}
                disabled={!formik.isValid}
              >
                Đăng nhập
              </Button>
              {/* <Button
                variant="outlined"
                size="lg"
                className="mt-6 flex h-12 items-center justify-center gap-2"
                fullWidth
              >
                <img
                  src={`https://www.material-tailwind.com/logos/logo-google.png`}
                  alt="google"
                  className="h-6 w-6"
                />
                sign in with google
              </Button> */}
              <Typography
                variant="small"
                color="gray"
                className="mt-4 text-center font-normal"
              >
                Chưa có tài khoản?{" "}
                <span
                  onClick={() => {
                    closeLoginForm();
                    openSignUpForm();
                  }}
                  className="font-medium text-gray-900 cursor-pointer"
                >
                  Đăng ký
                </span>
              </Typography>
            </form>
          </div>
        </section>
      </DialogBody>
    </Dialog>
  );
}

export default LoginForm;
