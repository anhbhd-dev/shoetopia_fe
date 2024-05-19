"use client";
import { useAuthContext } from "@/contexts/auth-context";
import { updateUserPassword } from "@/services/user.service";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

export function FormChangePassword() {
  const { user, logout } = useAuthContext();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
      newPassword: Yup.string()
        .required("Vui lòng nhập mật khẩu mới")
        .min(8, "Mật khẩu mới phải chứa ít nhất 8 ký tự"),
      confirmPassword: Yup.string()
        .required("Vui lòng nhập lại mật khẩu mới")
        .oneOf([Yup.ref("newPassword")], "Mật khẩu không trùng khớp"),
    }),
    onSubmit: async (values) => {
      try {
        await updateUserPassword({
          password: values.currentPassword,
          newPassword: values.newPassword,
          _id: user._id,
        });

        toast.success("Đổi mật khẩu thành công.", {
          duration: 2000,
          style: {
            background: "#fff",
          },
          iconTheme: {
            primary: "green",
            secondary: "#fff",
          },
        });
        formik.resetForm();
      } catch (err) {
        if ((err as any).response?.status !== 200) {
          toast.error("Mật khẩu không đúng.", {
            position: "top-center",
            duration: 2000,
            style: {
              background: "#fff",
            },
          });
        }
      }
    },
  });

  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography className="mt-8 text-xl font-bold">Đổi mật khẩu</Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={formik.handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography color="blue-gray" className="-mb-3 text-base">
              Mật khẩu hiện tại
            </Typography>
            <Input
              size="md"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              type="password"
            />
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="text-red-700">
                {formik.errors.currentPassword}
              </div>
            ) : null}
            <Typography color="blue-gray" className="-mb-3 text-base">
              Mật khẩu mới
            </Typography>
            <Input
              size="md"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-700">{formik.errors.newPassword}</div>
            ) : null}
            <Typography color="blue-gray" className="-mb-3 text-base">
              Nhập lại mật khẩu mới
            </Typography>
            <Input
              type="password"
              size="md"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-700">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Xác nhận đổi mật khẩu
          </Button>
          <Button onClick={logout} variant="outlined" className="mt-24">
            Đăng xuất
          </Button>
        </form>
      </Card>
    </>
  );
}
