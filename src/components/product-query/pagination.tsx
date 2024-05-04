"use client";
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FilterAndSortProductsType } from "@/app/products/page";

export type PLPPaginationProps = {
  filterProductsPage?: FilterAndSortProductsType;
  setFilterProductsPage: React.Dispatch<
    React.SetStateAction<FilterAndSortProductsType>
  >;
};

export function PLPPagination({
  filterProductsPage,
  setFilterProductsPage,
}: PLPPaginationProps) {
  const getItemProps = (pageNumber: number) =>
    ({
      variant:
        filterProductsPage?.currentPage === pageNumber ? "filled" : "text",
      color: "gray",
      onClick: () =>
        setFilterProductsPage((prev) => ({ ...prev, currentPage: pageNumber })),
    } as any);

  const next = () => {
    if (filterProductsPage?.currentPage === filterProductsPage?.totalPage)
      return;

    setFilterProductsPage((prev) => ({
      ...prev,
      currentPage: (prev.currentPage ?? 0) + 1,
    }));
  };
  const prev = () => {
    if (filterProductsPage?.currentPage === 1) return;

    setFilterProductsPage((prev) => ({
      ...prev,
      currentPage: (prev.currentPage ?? 0) - 1,
    }));
  };

  return (
    <div className="flex items-center gap-4 justify-end lg:mt-10">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={filterProductsPage?.currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: filterProductsPage?.totalPage ?? 0 }).map(
          (_, i) => (
            <IconButton key={i} {...getItemProps(i + 1)}>
              {i + 1}
            </IconButton>
          )
        )}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={
          filterProductsPage?.currentPage === filterProductsPage?.totalPage
        }
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
