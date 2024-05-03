import HomeProductsSlideListing from "@/components/home-products/home-products-slide-listing";
import { HomepageCarousel } from "@/components/sliders/homepage-carousel";
import TestimonialSlider from "@/components/testimonial/testimonial-slider";

export default function Home() {
  return (
    <main className="px-5 lg:px-0">
      <HomepageCarousel />
      <HomeProductsSlideListing />
      <TestimonialSlider />
    </main>
  );
}
