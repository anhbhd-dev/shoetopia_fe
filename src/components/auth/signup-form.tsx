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

export function SignUpForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordShown((cur) => !cur);

  const { isOpenSignUpForm, closeSignUpForm } = useAppContext();

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
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  return (
    <Dialog open={isOpenSignUpForm} handler={closeSignUpForm}>
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
                <a href="#" className="font-medium text-gray-900">
                  Đăng nhập
                </a>
              </Typography>
            </form>
          </div>
        </section>
      </DialogBody>
    </Dialog>
  );
}

export default SignUpForm;
