import SubTotal from "@/components/cart/sub-total";
import CheckoutInfo from "@/components/checkout/checkout-info";
import PaymentMethodSelection from "@/components/checkout/payment-method";
import React from "react";

export default function Checkout() {
  return (
    <main>
      <div className="lg:mt-20 lg:grid lg:grid-cols-6 lg:gap-8">
        <div className="col-span-4">
          <p className="font-semibold text-2xl mb-5">Thanh toán</p>
          <CheckoutInfo />
          <PaymentMethodSelection />
        </div>
        <div className="col-span-2">
          <SubTotal />
        </div>
      </div>
    </main>
  );
}
