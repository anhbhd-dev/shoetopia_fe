"use client";
import { formatMoney } from "@/utils/format-money";
import { IconButton, Typography } from "@material-tailwind/react";
import React from "react";

export default function ProductDetailsInfo() {
  return (
    <div>
      <Typography variant="h2" className="lg:min-h-20">
        This is product name
      </Typography>
      <Typography className="text-xl lg:mb-2">Giá bán</Typography>
      <div className="flex gap-10">
        <Typography className="text-xl font-bold text-red-500">
          {formatMoney(2000000)}
        </Typography>
        <Typography className="text-xl line-through text-gray-500">
          {formatMoney(2000000)}
        </Typography>
      </div>
      <div>
        <Typography className="text-xl lg:mt-5 lg:mb-2">Kích cỡ</Typography>
        <div className="flex">
          <IconButton variant="outlined">42</IconButton>
        </div>
      </div>
    </div>
  );
}
