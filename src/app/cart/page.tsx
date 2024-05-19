"use client";
import CartItemsList from "@/components/cart/cart-items-list";
import SubTotal from "@/components/cart/sub-total";
import { useAppContext } from "@/contexts/app-context";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
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
    <div className="lg:mt-20">
      <h2 className="text-2xl font-bold lg:mb-8">Giỏ hàng</h2>
      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4">
          <CartItemsList />
        </div>
        <div className="col-span-2">
          <SubTotal />
        </div>
      </div>
    </div>
  );
}
