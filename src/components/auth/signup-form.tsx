"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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
import { register } from "@/services/auth.service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export function SignUpForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordShown((cur) => !cur);

  const { isOpenSignUpForm, closeSignUpForm, openLoginForm } = useAppContext();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      password: Yup.string()
        .min(8, "Mật khẩu tối thiểu 8 kí tự")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu phải trùng nhau")
        .nullable()
        .required("Bắt buộc xác nhận mật khẩu"),
    }),
    onSubmit: async (values) => {
      try {
        const resSignUp = await register(values);
        if (resSignUp) {
          toast.success("Đăng ký thành công.", {
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
        closeSignUpForm();
      } catch (err) {
        if (
          (err as AxiosError | any).response?.data.statusCode === 400 &&
          (err as AxiosError | any).response?.data.message ===
            "User already exists"
        ) {
          return toast.error("Email đã được đăng ký trước đó.", {
            duration: 2000,
            style: {
              background: "#fff",
            },
          });
        }
        toast.error("Đã có lỗi xảy ra.", {
          duration: 2000,
          style: {
            background: "#fff",
          },
        });
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={isOpenSignUpForm} size="xs" handler={closeSignUpForm}>
      <DialogBody>
        <section className="grid text-center items-center p-2 ">
          <div>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Đăng ký
            </Typography>
            <Typography className="mb-8 text-gray-600 font-normal text-[18px]">
              Enter your email and password to sign up
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
              <div className="mb-6">
                <label htmlFor="confirmPassword">
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium text-gray-900"
                  >
                    Confirm Password
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
                  type={confirmPasswordShown ? "text" : "password"}
                  icon={
                    <i onClick={toggleConfirmPasswordVisibility}>
                      {confirmPasswordShown ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </i>
                  }
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <Button
                type="submit"
                color="gray"
                size="lg"
                className="mt-6"
                fullWidth
              >
                Đăng ký
              </Button>
              <Typography
                variant="small"
                color="gray"
                className="mt-4 text-center font-normal"
              >
                Đã có tài khoản?{" "}
                <span
                  onClick={() => {
                    closeSignUpForm();
                    openLoginForm();
                  }}
                  className="font-medium text-gray-900 cursor-pointer"
                >
                  Đăng nhập
                </span>
              </Typography>
            </form>
          </div>
        </section>
      </DialogBody>
    </Dialog>
  );
}

export default SignUpForm;
