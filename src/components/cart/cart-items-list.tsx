"use client";
import React from "react";
import CartItemRow from "./cart-item";
import { useCartContext } from "@/contexts/cart-context";
import Image from "next/image";

export default function CartItemsList() {
  const { cart } = useCartContext();
  return (
    <div>
      {!cart && <CartSkeletonLoading />}
      {cart.items.length ? (
        cart.items.map((item) => (
          <CartItemRow key={item.variation?._id} item={item} />
        ))
      ) : (
        <div className="flex justify-center items-center">
          <Image
            src={"/images/empty-cart.png"}
            width={500}
            height={500}
            alt="empty cart"
          />
        </div>
      )}
    </div>
  );
}

export const CartSkeletonLoading = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      className="justify-between mb-6 rounded-lg bg-white p-3 pr-5 shadow-md sm:flex sm:justify-start animate-pulse"
    >
      <div className="w-[200px]">
        <div className="bg-gray-300 rounded-lg w-20 h-20"></div>
      </div>
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 flex flex-col justify-between sm:mt-0">
          <div className="text-lg font-semibold text-gray-900 bg-gray-300 h-5 w-40 rounded"></div>
          <div className="mt-1 text-xs text-gray-700 bg-gray-300 h-3 w-24 rounded"></div>
          <div className="text-sm mt-2 bg-gray-300 h-5 w-20 rounded"></div>
        </div>
        <div className="mt-4 w-[160px] flex justify-between">
          <div className="flex items-center border-gray-100">
            <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
            <div className="h-8 w-8 border bg-white text-center text-xs"></div>
            <div className="bg-gray-300 h-8 w-8 rounded-full"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  ));
};
