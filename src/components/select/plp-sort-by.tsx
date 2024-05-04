"use client";
import { FilterAndSortProductsType } from "@/app/products/page";
import { OrderBy, SortBy } from "@/enum/sort.enum";
import { useDebounce } from "@/hooks/useDebounce";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { Select, Option } from "@material-tailwind/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export type SelectSortByPLPProps = {
  setFilterProductsPage: Dispatch<SetStateAction<FilterAndSortProductsType>>;
  setIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
};

const SORT_OPTIONS = [
  { orderBy: OrderBy.DESC, sortBy: SortBy.CREATED_AT },
  { orderBy: OrderBy.ASC, sortBy: SortBy.CREATED_AT },
  { orderBy: OrderBy.DESC, sortBy: SortBy.SALE_PRICE },
  { orderBy: OrderBy.ASC, sortBy: SortBy.SALE_PRICE },
];

export function SelectSortByPLP({
  setFilterProductsPage,
  setIsLoadingProducts,
}: SelectSortByPLPProps) {
  const [selectedSortBy, setSelectedSortBy] = useState<any>();

  const selectedSortByDebounced = useDebounce(selectedSortBy, 500);

  useEffect(() => {
    if (selectedSortByDebounced)
      setFilterProductsPage((prev) => ({
        ...prev,
        sortBy: selectedSortByDebounced.sortBy,
        orderBy: selectedSortByDebounced.orderBy,
      }));
  }, [selectedSortByDebounced, setFilterProductsPage]);

  return (
    <div className="w-72">
      <Select
        onChange={(value) => {
          if (
            SORT_OPTIONS[Number((value as string).slice(-1))] !== selectedSortBy
          ) {
            setSelectedSortBy(
              SORT_OPTIONS[Number((value as string).slice(-1))]
            );

            setIsLoadingProducts(true);
          }
        }}
        label="Sắp xếp theo"
      >
        <Option value="SORT_OPTIONS0">
          <p className="flex justify-between">
            <span className="min-w-[80px]">Mới nhất</span>
            <ArrowDownIcon width={15} />
          </p>
        </Option>
        <Option value="SORT_OPTIONS1">
          <p className="flex justify-between">
            <span className="min-w-[80px]">Cũ nhất</span>
            <ArrowUpIcon width={15} />
          </p>
        </Option>
        <Option value="SORT_OPTIONS2">
          <p className="flex justify-between">
            <span className="min-w-[80px]">Giá giảm dần</span>
            <ArrowDownIcon width={15} />
          </p>
        </Option>
        <Option value="SORT_OPTIONS3">
          <p className="flex justify-between">
            <span className="min-w-[80px]">Giá tăng dần</span>
            <ArrowUpIcon width={15} />
          </p>
        </Option>
      </Select>
    </div>
  );
}
