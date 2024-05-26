"use client";
import { PRODUCTS_LIST_BASE_URL } from "@/routes/routes";
import { getAverageRatingByProductId } from "@/services/review.service";
import { Product } from "@/types/product.type";
import { Variation } from "@/types/variation.type";
import { formatMoney } from "@/utils/format-money";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export type ProductCardType = {
  product: Product;
};

export function ProductCard({ product }: ProductCardType) {
  const [avgRating, setAvgRating] = useState(0);
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
  const { minPrice, maxPrice } = findMinMaxPrice(product?.variations ?? []);

  useEffect(() => {
    const fetchAvgRating = async () => {
      const res = await getAverageRatingByProductId(product._id);

      setAvgRating(res ?? 0);
    };
    fetchAvgRating();
  }, [product?._id]);

  return (
    <Card className="w-full lg:w-full overflow-hidden rounded-lg border shadow-md">
      <div
        color="blue-gray"
        className="m-0 min-h-[280px] max-h-[280px] overflow-hidden"
      >
        <Image
          width={300}
          height={300}
          src={product?.avatar}
          alt={product?.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardBody className="p-4">
        <div className="mb-3 flex items-center justify-between ">
          <Link href={`${PRODUCTS_LIST_BASE_URL}/${product?._id}`}>
            <Typography
              color="blue-gray"
              className="font-medium text-base text-ellipsis whitespace-nowrap overflow-hidden max-w-44"
            >
              {product?.name}
            </Typography>
          </Link>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            {avgRating !== 0 && (
              <>
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
                {avgRating.toFixed(1)}
              </>
            )}
          </Typography>
        </div>
        <div className="flex justify-between gap-5 ">
          <Typography color="gray" className="mb-1 block font-bold text-base">
            {formatMoney(minPrice)}
          </Typography>
          {minPrice !== maxPrice && (
            <>
              <Typography
                color="black"
                className="mb-1 block font-bold text-base"
              >
                -
              </Typography>
              <Typography
                color="gray"
                className="mb-1 block font-bold text-base"
              >
                {formatMoney(maxPrice)}
              </Typography>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export const ProductCardSkeleton = () => {
  return (
    <Card className="mt-6 w-full animate-pulse">
      <CardHeader
        shadow={false}
        floated={false}
        className="relative grid h-56 place-items-center bg-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-12 w-12 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </CardHeader>
      <CardBody>
        <Typography
          as="div"
          variant="h1"
          className="mb-4 h-3 w-56 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="mb-2 h-2 w-full rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </CardBody>
    </Card>
  );
};
