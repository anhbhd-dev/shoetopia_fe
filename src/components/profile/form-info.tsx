"use client";
import { useAuthContext } from "@/contexts/auth-context";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { updateUserInfo } from "@/services/user.service";
import toast from "react-hot-toast";
export function FormInfo() {
  const { user, setUser } = useAuthContext();
  const [isEditingShippingInfo, setIsEditingShippingInfo] = useState(false);
  const [clickResetForm, setClickResetForm] = useState(false);
  // Define validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Vui lòng nhập tên").trim(),
    lastName: Yup.string().required("Vui lòng nhập họ và tên đệm").trim(),
    address: Yup.string()
      .required("Địa chỉ giao hàng không được để trống")
      .trim(),
    phoneNumber: Yup.string()
      .required("Số điện thoại không được để trống")
      .matches(/^[0-9]*$/, "Số điện thoại chỉ được chứa các chữ số")
      .min(10, "Số điện thoại phải có ít nhất 10 số")
      .trim(),
  });

  const formik = useFormik({
    initialValues: {
      _id: user._id,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      address: user.address ?? "",
      phoneNumber: user.phoneNumber ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      try {
        const dataUpdateResponse = await updateUserInfo(values);
        if (dataUpdateResponse) {
          setUser({ ...user, ...dataUpdateResponse });
          return toast.success("Cập nhật thành công.", {
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
        toast.error("Đã có lỗi xảy ra.", {
          duration: 2000,
          position: "top-right",
          style: {
            background: "#fff",
          },
        });
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    formik.setFieldValue("_id", user._id);
    formik.setFieldValue("firstName", user.firstName);
    formik.setFieldValue("lastName", user.lastName);
    formik.setFieldValue("address", user.address);
    formik.setFieldValue("phoneNumber", user.phoneNumber);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, clickResetForm]);

  const handleCancel = () => {
    setIsEditingShippingInfo(false);
    formik.resetForm();
    setClickResetForm(!clickResetForm);
  };
  return (
    <Card color="transparent" shadow={false}>
      <div className="flex items-center justify-between">
        <Typography className="mt-8 text-xl font-bold">
          Thông tin tài khoản
        </Typography>
        {!isEditingShippingInfo ? (
          <Button
            variant="outlined"
            onClick={() => setIsEditingShippingInfo(!isEditingShippingInfo)}
            className="mt-6 mr-10"
          >
            <FaPen />
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={handleCancel}
            className="mt-6 mr-10"
          >
            Huỷ
          </Button>
        )}
      </div>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-1 flex flex-col gap-6">
          <Typography color="blue-gray" className="-mb-3 text-base">
            Email
          </Typography>
          <Input
            disabled
            size="md"
            value={user.email}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography color="blue-gray" className="-mb-3 text-base">
            Tên
          </Typography>
          <Input
            name="firstName"
            disabled={!isEditingShippingInfo}
            size="md"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <Typography color="red" className="mt-[-15px]">
              {formik.errors.firstName}
            </Typography>
          )}
          <Typography color="blue-gray" className="-mb-3 text-base">
            Họ và tên đệm
          </Typography>
          <Input
            name="lastName"
            disabled={!isEditingShippingInfo}
            size="md"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <Typography color="red" className="mt-[-15px]">
              {formik.errors.lastName}
            </Typography>
          )}
          <Typography color="blue-gray" className="-mb-3 text-base">
            Địa chỉ giao hàng
          </Typography>
          <Input
            name="address"
            disabled={!isEditingShippingInfo}
            size="md"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={formik.values.address}
            onChange={formik.handleChange}
          />
          {formik.touched.address && formik.errors.address && (
            <Typography color="red" className="mt-[-15px]">
              {formik.errors.address}
            </Typography>
          )}
          <Typography color="blue-gray" className="-mb-3 text-base">
            Số điện thoại nhận hàng
          </Typography>
          <Input
            name="phoneNumber"
            type="text"
            size="md"
            disabled={!isEditingShippingInfo}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <Typography color="red" className="mt-[-15px]">
              {formik.errors.phoneNumber}
            </Typography>
          )}
        </div>

        <div className="flex justify-end">
          {isEditingShippingInfo && (
            <Button
              loading={formik.isSubmitting}
              type="submit"
              disabled={!formik.isValid}
              className="mt-6"
            >
              Cập nhật thông tin
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
