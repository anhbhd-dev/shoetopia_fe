"use client";
import { DescriptionAndReview } from "@/components/product-details/description-and-review";
import { ProductDetailsImages } from "@/components/product-details/product-details-images";
import ProductDetailsInfo from "@/components/product-details/product-details-info";
import { fetchProductById } from "@/services/product-services";
import { Product } from "@/types/product.type";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const [productDetails, setProductDetails] = React.useState<Product>();
  const router = useRouter();
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const productData = await fetchProductById(params.slug);
        setProductDetails(productData);
      } catch (err) {
        router.push("/not-found");
      }
    }
    fetchProductDetails();
  }, [params.slug, router]);
  return (
    <>
      <div className="grid grid-cols-4 lg:mt-20 gap-20">
        <div className="col-span-2 w-[500px]">
          <ProductDetailsImages productDetails={productDetails} />
        </div>
        <div className="col-span-2">
          <ProductDetailsInfo productDetails={productDetails} />
        </div>
      </div>
      <DescriptionAndReview productDetails={productDetails} />
    </>
  );
}
