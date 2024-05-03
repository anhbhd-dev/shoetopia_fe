"use client";
import { ProductCard } from "../product/product-card";
import { Category, Product } from "@/types/product.type";
import "keen-slider/keen-slider.min.css";
import KeenSlider from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
export type SlideProductsListingType = {
  category?: Category;
  listProductInCategory?: {
    products?: Product[];
    totalDocs?: number;
    totalPage?: number;
  };
};
export default function SlideProductsListing({
  category,
  listProductInCategory,
}: SlideProductsListingType) {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 4,
      spacing: 15,
    },
  });

  return (
    <div className="mt-10">
      <p className="lg:text-2xl text-xl font-bold lg:mb-5 mb-2">
        {category?.name}
      </p>
      <div className="flex justify-between overflow-auto">
        <div ref={ref} className="keen-slider">
          {listProductInCategory?.products?.map((product) => (
            <div key={product._id} className="py-1 keen-slider__slide">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
