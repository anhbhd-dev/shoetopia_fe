import SlideProductsListing from "@/components/home-products/slide-product-listing";
import { HomepageCarousel } from "@/components/sliders/homepage-carousel";

export default function Home() {
  return (
    <main>
      <HomepageCarousel />
      <SlideProductsListing />
    </main>
  );
}
