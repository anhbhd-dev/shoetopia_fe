"use client";
import { CHECKOUT_BASE_URL } from "@/routes/routes";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function SubTotal() {
  const router = useRouter();

  const pathname = usePathname();
  const isOnCheckoutPage = useMemo(
    () => pathname.startsWith(CHECKOUT_BASE_URL),
    [pathname]
  );

  const handleGoToCheckoutPage = () => {
    router.push(CHECKOUT_BASE_URL);
  };
  return (
    <div className="rounded-lg border bg-white p-6 shadow-md ">
      <p className="text-xl font-bold lg:mb-5">Thông tin thanh toán</p>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Tổng tiền hàng</p>
        <p className="text-gray-700">$129.99</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Phí vận chuyển</p>
        <p className="text-gray-700">$4.99</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">$134.98 USD</p>
        </div>
      </div>
      {isOnCheckoutPage && (
        <button className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50 hover:bg-blue-gray-900">
          Thanh toán
        </button>
      )}
      {!isOnCheckoutPage && (
        <button
          onClick={handleGoToCheckoutPage}
          className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-blue-50 hover:bg-blue-gray-900"
        >
          Tới trang thanh toán
        </button>
      )}
    </div>
  );
}
