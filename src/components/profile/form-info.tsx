"use client";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

export function FormInfo() {
  return (
    <Card color="transparent" shadow={false}>
      <Typography className="mt-8 text-xl font-bold">
        Thông tin tài khoản
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography color="blue-gray" className="-mb-3 text-base">
            Email
          </Typography>
          <Input
            size="md"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography color="blue-gray" className="-mb-3 text-base">
            Địa chỉ giao hàng
          </Typography>
          <Input
            size="md"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography color="blue-gray" className="-mb-3 text-base">
            Số điện thoại nhận hàng
          </Typography>
          <Input
            type="password"
            size="md"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <div className="flex justify-end">
          <Button className="mt-6">Cập nhật thông tin</Button>
        </div>
      </form>
    </Card>
  );
}
