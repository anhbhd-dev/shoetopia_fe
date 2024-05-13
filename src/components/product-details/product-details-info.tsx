"use client";
import { useAppContext } from "@/contexts/app-context";
import { useAuthContext } from "@/contexts/auth-context";
import { useCartContext } from "@/contexts/cart-context";
import { Product } from "@/types/product.type";
import { Variation } from "@/types/variation.type";
import { formatMoney } from "@/utils/format-money";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import React from "react";
import toast from "react-hot-toast";

export type ProductDetailsInfoProps = {
  productDetails: Product | undefined;
};

export default function ProductDetailsInfo({
  productDetails,
}: ProductDetailsInfoProps) {
  const [currentVariation, setCurrentVariation] = React.useState<
    Variation | undefined
  >(undefined);

  const [quantityInput, setQuantityInput] = React.useState(1);
  const { user } = useAuthContext();
  const { addToCart, cart } = useCartContext();
  const { openLoginForm } = useAppContext();
  const findMinMaxPrice = (variations: Variation[]) => {
    const minPrice = variations.reduce(
      (min, variation) =>
        variation.salePrice < min ? variation.salePrice : min,
      variations[0]?.salePrice
    );

    const maxPrice = variations.reduce(
      (max, variation) =>
        variation.salePrice > max ? variation.salePrice : max,
      variations[0]?.salePrice
    );

    return { minPrice, maxPrice };
  };
  const { minPrice, maxPrice } = findMinMaxPrice(
    productDetails?.variations ?? []
  );

  const handleChangeQuantityInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    // Sử dụng regex để kiểm tra nếu là số và lớn hơn 0
    if (/^[1-9][0-9]*$/.test(value)) {
      // Chỉ thiết lập state nếu giá trị là số và lớn hơn 0
      setQuantityInput(Number(value));
    }
  };

  const handlePlusMinusQuantity = (value: number) => {
    setQuantityInput((prev) => prev + value);
  };

  const handleAddToCart = async () => {
    if (!user?.isAuthenticated) {
      toast.error("Bạn cần đăng nhập trước", {
        position: "top-center",
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#333",
        },
      });
      return openLoginForm();
    }
    if (!currentVariation) {
      return;
    }
    if (currentVariation) {
      addToCart({
        variationId: currentVariation._id,
        quantity: quantityInput ?? 1,
      });
    }
  };

  return (
    <div>
      <Typography variant="h3" className="mb-6">
        {productDetails?.name}
      </Typography>
      <Typography className="text-base lg:mb-2">Giá bán</Typography>
      {!currentVariation ? (
        <div className="flex gap-5">
          <Typography className="text-xl font-bold text-red-500">
            {formatMoney(minPrice)}
          </Typography>
          {maxPrice !== minPrice && (
            <>
              <Typography className="text-xl line-through text-red-500">
                -
              </Typography>
              <Typography className="text-xl font-bold text-red-500">
                {formatMoney(maxPrice)}
              </Typography>
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-10">
          <Typography className="text-xl font-bold text-red-500">
            {formatMoney(currentVariation.salePrice)}
          </Typography>

          <Typography className="text-xl line-through text-gray-500">
            {formatMoney(currentVariation.unitPrice)}
          </Typography>
        </div>
      )}
      <div>
        <Typography className="text-base lg:mt-5 lg:mb-4">Kích cỡ</Typography>
        <div className="flex flex-wrap lg:gap-4">
          {productDetails?.variations.map((variation) => (
            <IconButton
              onClick={() => setCurrentVariation(variation)}
              key={variation._id}
              variant={
                currentVariation?._id === variation._id ? "filled" : "outlined"
              }
              disabled={variation.availableQuantity === 0}
            >
              {variation.size}
            </IconButton>
          ))}
        </div>
      </div>
      <div>
        <Typography className="text-base lg:mt-5 lg:mb-4">Số lượng</Typography>
        <div className="flex flex-row justify-start">
          <div className="flex items-center border-gray-600">
            <button
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-black hover:text-blue-50"
              onClick={() => {
                if (quantityInput > 1) handlePlusMinusQuantity(-1);
              }}
            >
              -
            </button>
            <input
              className="h-8  border bg-white text-center text-xs w-12 outline-none"
              type="text"
              value={quantityInput}
              min="1"
              onChange={handleChangeQuantityInput}
            />
            <button
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-blue-50"
              onClick={() => handlePlusMinusQuantity(1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="lg:mt-8 lg:min-w-40"
          disabled={!currentVariation}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button
          size="lg"
          variant="outlined"
          className="lg:mt-8 lg:min-w-40"
          disabled={!currentVariation}
        >
          Mua ngay
        </Button>
      </div>
      <OpenSizeChart />
    </div>
  );
}

import { Dialog, DialogBody } from "@material-tailwind/react";
import Image from "next/image";

export function OpenSizeChart() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div onClick={handleOpen}>
        <p className="mt-10 cursor-pointer font-semibold text-blue-gray-900">
          Xem bảng size
        </p>
      </div>

      <Dialog size="md" open={open} handler={handleOpen}>
        <DialogBody>
          <Image
            src="/images/size-chart.png"
            width={600}
            height={600}
            alt="size chart"
          />
        </DialogBody>
      </Dialog>
    </>
  );
}
