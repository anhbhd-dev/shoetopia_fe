"use client";
import SubTotal from "@/components/cart/sub-total";
import CheckoutInfo from "@/components/checkout/checkout-info";
import PaymentMethodSelection from "@/components/checkout/payment-method";
import { useAppContext } from "@/contexts/app-context";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import React from "react";

export default function Checkout() {
  const router = useRouter();
  const { openLoginForm } = useAppContext();
  const { user, isAuthenticating } = useAuthContext();
  if (isAuthenticating) return null;
  if (!user.isAuthenticated) {
    router.push("/");
    openLoginForm();
  }
  if (!user.isAuthenticated) return null;
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
