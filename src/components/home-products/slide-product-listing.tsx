"use client";
import React from "react";
import { ProductCard } from "../product/product-card";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function SlideProductsListing() {
  return (
    <div className="mt-10">
      <p className="lg:text-2xl text-xl font-bold lg:mb-5 mb-2">Category 1</p>
      <div className="flex justify-between overflow-auto">
        <Swiper
          className="mt-5"
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 3,
            },
            1440: {
              slidesPerView: 4,
            },
          }}
        >
          {[0, 1, 2, 3].map((item) => (
            <SwiperSlide key={item} className="py-1">
              <ProductCard />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
