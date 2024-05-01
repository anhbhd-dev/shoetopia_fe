import { DescriptionAndReview } from "@/components/product-details/description-and-review";
import { ProductDetailsImages } from "@/components/product-details/product-details-images";
import ProductDetailsInfo from "@/components/product-details/product-details-info";
import React from "react";

export default function ProductDetails() {
  return (
    <>
      <div className="grid grid-cols-5 lg:mt-20 gap-14">
        <div className="col-span-3">
          <ProductDetailsImages />
        </div>
        <div className="col-span-2">
          <ProductDetailsInfo />
        </div>
      </div>
      <DescriptionAndReview />
    </>
  );
}
