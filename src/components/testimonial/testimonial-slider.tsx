"use client";
// Import Swiper styles
import { TestimonialCard } from "./card";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const comments = [
  {
    name: "Nguyễn Thị Lan Anh",
    comment:
      "Chất lượng giày tuyệt vời, tôi rất hài lòng với sản phẩm từ cửa hàng này!",
  },
  {
    name: "Lê Minh Tuấn",
    comment:
      "Đôi giày mà tôi mua có thiết kế đẹp và chất lượng tốt. Sẽ quay lại mua thêm!",
  },
  {
    name: "Trần Thị Hương Giang",
    comment:
      "Giày của cửa hàng thật sự ấn tượng! Tôi đã nhận được nhiều lời khen từ bạn bè về đôi giày mới của mình.",
  },
  {
    name: "Phạm Văn Đức",
    comment:
      "Giày của cửa hàng rất đa dạng và phong phú. Tôi sẽ giới thiệu cho bạn bè biết ngay!",
  },
  {
    name: "Đỗ Thị Mai Linh",
    comment:
      "Chất lượng sản phẩm tuyệt vời, dịch vụ phục vụ chuyên nghiệp. Tôi sẽ là một khách hàng thường xuyên của cửa hàng này!",
  },
];

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
        {comments.map((comment, i) => (
          <div key={i} className="keen-slider__slide">
            <TestimonialCard comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
}
