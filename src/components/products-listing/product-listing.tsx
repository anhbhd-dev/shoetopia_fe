import React from "react";
import { ProductCard } from "../product/product-card";

export default function ProductsResultListing() {
  return (
    <div className="grid grid-cols-3 gap-4 gap-y-10">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
