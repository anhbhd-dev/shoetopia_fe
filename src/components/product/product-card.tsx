"use client";
import { Product } from "@/types/product.type";
import { formatMoney } from "@/utils/format-money";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image";
export type ProductCardType = {
  product: Product;
};

export function ProductCard({ product }: ProductCardType) {
  return (
    <Card className="w-full lg:w-full overflow-hidden rounded-lg border shadow-md">
      <div
        color="blue-gray"
        className="m-0 min-h-[280px] max-h-[280px] overflow-hidden"
      >
        <Image
          width={300}
          height={300}
          src={product.avatar}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardBody className="p-4">
        <div className="mb-3 flex items-center justify-between ">
          <Typography
            color="blue-gray"
            className="font-medium text-base text-ellipsis whitespace-nowrap overflow-hidden max-w-44"
          >
            {product.name}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            5.0
          </Typography>
        </div>
        <div className="flex justify-between gap-5 ">
          <Typography color="black" className="mb-1 block font-bold text-base">
            {formatMoney(2000000)}
          </Typography>
          <Typography
            color="gray"
            className="mb-1 block font-bold line-through text-base"
          >
            {formatMoney(2000000)}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}
