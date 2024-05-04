"use client";
// Import Swiper styles
import { TestimonialCard } from "./card";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
export default function TestimonialSlider() {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 3, spacing: 20 },
  });
  return (
    <div className="mt-20">
      <p className="lg:text-2xl text-xl font-bold lg:mb-5 mb-2">
        Trải nghiệm người dùng
      </p>
      <div ref={sliderRef} className="keen-slider">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="keen-slider__slide">
            <TestimonialCard />
          </div>
        ))}
      </div>
    </div>
  );
}
