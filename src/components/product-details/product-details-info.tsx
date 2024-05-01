"use client";
import { formatMoney } from "@/utils/format-money";
import {
  Button,
  IconButton,
  Rating,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export default function ProductDetailsInfo() {
  return (
    <div>
      <Typography variant="h2" className="lg:min-h-20">
        This is product name
      </Typography>
      <Typography className="text-base lg:mb-2">Giá bán</Typography>
      <div className="flex gap-10">
        <Typography className="text-xl font-bold text-red-500">
          {formatMoney(2000000)}
        </Typography>
        <Typography className="text-xl line-through text-gray-500">
          {formatMoney(2000000)}
        </Typography>
      </div>
      <div>
        <Typography className="text-base lg:mt-5 lg:mb-4">Kích cỡ</Typography>
        <div className="flex flex-wrap lg:gap-4">
          <IconButton variant="outlined">42</IconButton>
          <IconButton variant="outlined">42</IconButton>
          <IconButton variant="outlined">42</IconButton>
          <IconButton variant="outlined">42</IconButton>
          <IconButton variant="outlined">42</IconButton>
          <IconButton variant="outlined">42</IconButton>
          <IconButton variant="outlined">42</IconButton>
          <IconButton variant="outlined">42</IconButton>
          <IconButton variant="outlined">42</IconButton>
          <IconButton variant="outlined">42</IconButton>
        </div>
      </div>
      <div>
        <Typography className="text-base lg:mt-5 lg:mb-4">Số lượng</Typography>
        <div className="flex flex-wrap lg:gap-4">
          <IconButton variant="outlined">42</IconButton>
        </div>
      </div>
      <div className="flex gap-5">
        <Button size="lg" className="lg:mt-8 lg:min-w-40">
          Thêm vào giỏ hàng
        </Button>
        <Button size="lg" variant="outlined" className="lg:mt-8 lg:min-w-40">
          Mua ngay
        </Button>
      </div>
    </div>
  );
}
