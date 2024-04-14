"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { TestimonialCard } from "./card";

export default function TestimonialSlider() {
  return (
    <div className="mt-20">
      <p className="lg:text-2xl text-xl font-bold lg:mb-5 mb-2">Testimonial</p>
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
        }}
      >
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
        <SwiperSlide>
          <TestimonialCard />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
