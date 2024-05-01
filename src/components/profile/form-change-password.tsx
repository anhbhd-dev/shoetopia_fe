"use client";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

export function FormChangePassword() {
  return (
    <Card color="transparent" shadow={false}>
      <Typography className="mt-8 text-xl font-bold">Đổi mật khẩu</Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
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
          />
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
          />
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
          />
        </div>

        <Button className="mt-6" fullWidth>
          Xác nhận đổi mật khẩu
        </Button>
      </form>
    </Card>
  );
}
