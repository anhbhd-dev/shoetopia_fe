"use client";
import HomeProductsSlideListing from "../home-products/home-products-slide-listing";
import { HomepageCarousel } from "../sliders/homepage-carousel";
import TestimonialSlider from "../testimonial/testimonial-slider";

export default function Home() {
  return (
    <div>
      <HomepageCarousel />
      <HomeProductsSlideListing />
      <TestimonialSlider />
    </div>
  );
}
