import React from "react";
import { ProductCard } from "../product/product-card";

export default function SlideProductsListing() {
  return (
    <div className="mt-10">
      <p className="text-2xl font-bold mb-5">Category 1</p>
      <div className="flex justify-between">
        {[0, 1, 2, 3].map((item) => (
          <ProductCard key={item} />
        ))}
      </div>
    </div>
  );
}
