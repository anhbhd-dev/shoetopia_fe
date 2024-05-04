"use client";
import SlideProductsListing from "@/components/home-products/slide-product-listing";
import { fetchHomeCategories } from "@/services/category-services";
import { fetchProducts } from "@/services/product-services";
import { Category } from "@/types/product.type";
import { useEffect, useState } from "react";
export default function HomeProductsSlideListing() {
  const [homeCategories, setHomeCategories] = useState([]);
  const [homeProducts, setHomeProducts] = useState<any[]>();
  useEffect(() => {
    const fetchAllHomeCategories = async () => {
      const dataCategories = await fetchHomeCategories();
      setHomeCategories(dataCategories);
    };
    fetchAllHomeCategories();
  }, []);

  useEffect(() => {
    const fetchAllHomeProducts = async () => {
      await Promise.all(
        homeCategories.map(async (category: Category) => {
          return await fetchProducts({ categories: category._id, limit: 20 });
        })
      ).then((data) => {
        setHomeProducts(data as any[]);
      });
    };
    fetchAllHomeProducts();
  }, [homeCategories]);
  return (
    <div>
      {homeProducts?.map((listProductInCategory, index) => (
        <SlideProductsListing
          category={homeCategories[index]}
          listProductInCategory={listProductInCategory as any}
          key={index}
        />
      ))}
    </div>
  );
}
