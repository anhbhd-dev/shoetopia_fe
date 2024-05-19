"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Product } from "@/types/product.type";
import { ProductDetailRate } from "../order-details/product-rating/product-rate";
import { fetchReviewsByProductId } from "@/services/review.service";
import { Review } from "@/types/review.type";

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
export type DescriptionAndReviewProps = {
  productDetails: Product | undefined;
};
export function DescriptionAndReview({
  productDetails,
}: DescriptionAndReviewProps) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const dataReviews = await fetchReviewsByProductId(
        productDetails?._id ?? ""
      );
      setReviews(dataReviews);
    };
    fetchReviews();
  }, [productDetails]);

  return (
    <div className="lg:mt-14">
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          Mô tả sản phẩm
        </AccordionHeader>
        <AccordionBody className="text-base">
          {productDetails?.description}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          Đánh giá của người mua
        </AccordionHeader>
        <AccordionBody>
          {reviews?.length === 0 ? (
            <p className="text-base">Chưa có đánh giá nào</p>
          ) : (
            reviews.map((review) => (
              <ProductDetailRate key={review._id} review={review} />
            ))
          )}
        </AccordionBody>
      </Accordion>
    </div>
  );
}
