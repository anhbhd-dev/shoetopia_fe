"use client";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
export function HomepageCarousel() {
  return (
    <div className="w-full flex justify-center ">
      <Carousel
        className="lg:mt-10 mt-5 rounded-xl"
        autoplay={true}
        autoplayDelay={5000}
        loop={true}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Image
            key={i}
            src={`/banners/banner${i + 1}.jpg`}
            alt="image 1"
            className="lg:max-h-[550px] max-h-44 w-full object-cover"
            width={1920}
            height={500}
          />
        ))}
      </Carousel>
    </div>
  );
}
