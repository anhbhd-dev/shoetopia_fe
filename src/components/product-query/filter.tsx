"use client";
import { FilterAndSortProductsType } from "@/app/products/page";
import { useDebounce } from "@/hooks/useDebounce";
import { Category } from "@/types/product.type";
import { Checkbox, Input, Select, Option } from "@material-tailwind/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
export type FilterPLPType = {
  variationNames?: string[];
  categoriesData?: {
    categories?: Category[];
    page?: number;
  };
  setCategoriesData: React.Dispatch<
    React.SetStateAction<{
      categories: Category[];
      page: number;
    }>
  >;
  setFilterProductsPage: Dispatch<SetStateAction<FilterAndSortProductsType>>;
  setIsLoadingProducts: Dispatch<SetStateAction<boolean>>;
};

export default function FilterPLP({
  categoriesData,
  variationNames,
  setFilterProductsPage,
  setCategoriesData,
  setIsLoadingProducts,
}: FilterPLPType) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedSizeNames, setSelectedSizeNames] = useState<string[]>([]);
  // const [selectedVariationNames, setSelectedVariationNames] = useState<string[]>([]);

  const debouncedSelectedCategoryIds = useDebounce(selectedCategoryIds, 500); // Trì hoãn 500ms
  const debouncedSelectedSizeNames = useDebounce(selectedSizeNames, 500); // Trì hoãn 500ms
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500); // Trì hoãn 500ms
  const [priceRange, setPriceRange] = useState<{
    minPrice?: number;
    maxPrice?: number;
  }>({
    minPrice: undefined,
    maxPrice: undefined,
  });

  const debouncedPriceRange = useDebounce(priceRange, 500);
  useEffect(() => {
    // Thực hiện tác vụ tìm kiếm khi debouncedSearchKeyword thay đổi
    setFilterProductsPage((prev) => ({
      ...prev,
      page: 1,
      name: debouncedSearchKeyword,
    }));
  }, [debouncedSearchKeyword, setFilterProductsPage]);

  const handleChangeKeywords = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    setIsLoadingProducts(true);
  };

  useEffect(() => {
    setFilterProductsPage((prev) => ({
      ...prev,
      minPrice: debouncedPriceRange.minPrice,
      maxPrice: debouncedPriceRange.maxPrice,
    }));
  }, [debouncedPriceRange, setFilterProductsPage, setIsLoadingProducts]);

  const handleChangePriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange({
      ...priceRange,
      [e.target.name]: e.target.value,
    });
    setIsLoadingProducts(true);
  };

  const handleChangeCategories = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
    } else {
      setSelectedCategoryIds(
        selectedCategoryIds.filter((id) => id !== categoryId)
      );
    }
    setIsLoadingProducts(true);
  };
  const handleChangeSizes = (sizeName: string, checked: boolean) => {
    if (checked) {
      setSelectedSizeNames([...selectedSizeNames, sizeName]);
    } else {
      setSelectedSizeNames(
        selectedSizeNames.filter((size) => size !== sizeName)
      );
    }
    setIsLoadingProducts(true);
  };
  useEffect(() => {
    setFilterProductsPage((prev) => ({
      ...prev,
      categories: debouncedSelectedCategoryIds.join(","),
      page: 1,
    }));
  }, [debouncedSelectedCategoryIds, setFilterProductsPage]);
  useEffect(() => {
    setFilterProductsPage((prev) => ({
      ...prev,
      sizes: debouncedSelectedSizeNames.join(","),
      page: 1,
    }));
  }, [debouncedSelectedSizeNames, setFilterProductsPage]);

  console.log(selectedSizeNames);
  return (
    <div className="overflow-hidden">
      <div className="lg:mb-10 ml-2">
        <p className="text-xl font-bold lg:mb-5 mb-2">Tìm kiếm</p>
        <Input onChange={handleChangeKeywords} label="Nhập từ khoá..." />
      </div>
      <p className="ml-2 text-xl font-bold lg:mb-5 mb-2">Danh mục</p>

      {categoriesData?.categories?.map((category) => (
        <Checkbox
          key={category._id}
          label={
            <p className="text-ellipsis whitespace-nowrap overflow-hidden lg:max-w-52">
              {category.name}
            </p>
          }
          checked={selectedCategoryIds.includes(category._id)}
          onChange={(e) =>
            handleChangeCategories(category._id, e.currentTarget.checked)
          }
        />
      ))}

      <div className="lg:mb-10 ml-2">
        <p className="text-xl font-bold lg:mb-5 mb-2 mt-5">Khoảng giá</p>
        <div className="flex flex-col gap-4 lg:w-20 lg:mt-8">
          <Input
            variant="static"
            name="minPrice"
            label="Giá tối thiểu"
            placeholder="0"
            onChange={handleChangePriceRange}
          />
          <Input
            variant="static"
            name="maxPrice"
            label="Giá tối đa"
            placeholder="200000"
            onChange={handleChangePriceRange}
          />
        </div>
      </div>
      <div>
        <p className="ml-2 text-xl font-bold lg:mb-5 mb-2">Sizes</p>
        {variationNames?.map((name) => (
          <Checkbox
            key={name}
            onChange={(e) => handleChangeSizes(name, e.currentTarget.checked)}
            label={<p>Size {name}</p>}
          />
        ))}
      </div>
    </div>
  );
}
