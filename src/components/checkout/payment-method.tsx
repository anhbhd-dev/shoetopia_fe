"use client";
import { useCartContext } from "@/contexts/cart-context";
import { PaymentMethod } from "@/enum/order";
import Image from "next/image";
import { useState } from "react";

export default function PaymentMethodSelection() {
  const { checkOutInformation, setCheckOutInformation } = useCartContext();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PaymentMethod.CASH_ON_DELIVERY
  );
  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setCheckOutInformation({
      ...checkOutInformation,
      payment: {
        ...checkOutInformation?.payment,
        paymentMethod: method,
      },
    });
  };
  return (
    <div>
      <p className="mt-8 text-base font-medium">Phương thức thanh toán</p>
      <form className="mt-5 grid gap-6 w-[700px]">
        <div className="relative">
          <input
            key="COD"
            className="peer hidden"
            id="radio_1"
            type="radio"
            name="radio"
            checked={selectedPaymentMethod === PaymentMethod.CASH_ON_DELIVERY}
            onChange={() =>
              handlePaymentMethodChange(PaymentMethod.CASH_ON_DELIVERY)
            }
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            htmlFor="radio_1"
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
          >
            <Image
              className="w-14 object-contain"
              src="/images/COD.png"
              alt=""
              width={70}
              height={70}
            />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Cash on Delivery</span>
              <p className="text-slate-500 text-sm leading-6">
                Giao hàng và nhận tiền
              </p>
            </div>
          </label>
        </div>
        <div className="relative">
          <input
            key="VNPay"
            className="peer hidden"
            id="radio_2"
            type="radio"
            name="radio"
            checked={selectedPaymentMethod === PaymentMethod.VNPAY}
            onChange={() => handlePaymentMethodChange(PaymentMethod.VNPAY)}
          />
          <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
          <label
            htmlFor="radio_2"
            className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
          >
            <Image
              className="w-14 object-contain"
              src="/images/vnpay.png"
              width={70}
              height={70}
              alt={""}
            />
            <div className="ml-5">
              <span className="mt-2 font-semibold">Ví VNPay</span>
              <p className="text-slate-500 text-sm leading-6">
                Thanh toán trực tuyến
              </p>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
}
