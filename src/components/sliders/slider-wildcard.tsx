"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { HotProductCard } from "../product/hot-product-card";

export default function SliderWildcard() {
  return (
    <Swiper
      className="mt-10"
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
      <SwiperSlide className="py-1">
        <HotProductCard />
      </SwiperSlide>
      <SwiperSlide className="py-1">
        <HotProductCard />
      </SwiperSlide>
      <SwiperSlide className="py-1">
        <HotProductCard />
      </SwiperSlide>
      <SwiperSlide className="py-1">
        <HotProductCard />
      </SwiperSlide>
      <SwiperSlide className="py-1">
        <HotProductCard />
      </SwiperSlide>
    </Swiper>
  );
}
