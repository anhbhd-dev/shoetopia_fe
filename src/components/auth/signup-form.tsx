"use client";
import { useState } from "react";

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
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  const { isOpenSignUpForm, closeSignUpForm } = useAppContext();

  return (
    <Dialog open={isOpenSignUpForm} handler={closeSignUpForm}>
      <DialogBody>
        <section className="grid text-center items-center p-2 ">
          <div>
            <Typography variant="h3" color="blue-gray" className="mb-2">
              Đăng ký
            </Typography>
            <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
              Enter your email and password to sign up
            </Typography>
            <form action="#" className="mx-auto max-w-[24rem] text-left">
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
                />
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
                />
              </div>
              <Button color="gray" size="lg" className="mt-6" fullWidth>
                Đăng ký
              </Button>
              {/* <div className="mt-4 flex justify-end">
                <Typography
                  as="a"
                  href="#"
                  color="blue-gray"
                  variant="small"
                  className="font-medium"
                >
                  Forgot password
                </Typography>
              </div> */}

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
