"use client";
import { Input } from "@material-tailwind/react";
import React from "react";

export default function CheckoutInfo() {
  return (
    <div>
      <div className="flex items-center gap-4 mt-8">
        <p className="text-base font-medium min-w-44">Tên người nhận hàng</p>
        <p>Nguyễn Thanh Thúy</p>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <p className="text-base font-medium min-w-44">Email</p>
        <p>Nguyễn Thanh Thúy</p>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <p className="text-base font-medium min-w-44">Số điện thoại</p>
        <p>Nguyễn Thanh Thúy</p>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <p className="text-base font-medium min-w-44">Địa chỉ giao hàng</p>
        <p>Nguyễn Thanh Thúy</p>
      </div>
    </div>
  );
}
