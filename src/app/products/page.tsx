import FilterPLP from "@/components/product-query/filter";
import { PLPPagination } from "@/components/product-query/pagination";
import ProductsResultListing from "@/components/products-listing/product-listing";
import { SelectSortByPLP } from "@/components/select/plp-sort-by";
import React from "react";

export default function ProductsListing() {
  return (
    <div className="mt-20">
      <div className="grid grid-cols-4 gap-8">
        <div>
          <div className="lg:mb-10 min-h-10 ml-2">
            <span className="font-medium">Kết quả</span> (29)
          </div>

          <FilterPLP />
        </div>
        <div className="col-span-3">
          <div className="lg:mb-10 min-h-10 flex justify-end">
            <SelectSortByPLP />
          </div>
          <ProductsResultListing />
          <PLPPagination />
        </div>
      </div>
    </div>
  );
}
