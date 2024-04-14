import SlideProductsListing from "@/components/home-products/slide-product-listing";
import { HomepageCarousel } from "@/components/sliders/homepage-carousel";
import SliderWildcard from "@/components/sliders/slider-wildcard";
import TestimonialSlider from "@/components/testimonial/testimonial-slider";

export default function Home() {
  return (
    <main className="px-5 lg:px-0">
      <HomepageCarousel />
      <SlideProductsListing />
      <SliderWildcard />
      <SlideProductsListing />
      <TestimonialSlider />
    </main>
  );
}
