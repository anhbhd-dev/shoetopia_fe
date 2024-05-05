"use client";
import React from "react";
import CartItemRow from "./cart-item";
import { useCartContext } from "@/contexts/cart-context";
import Image from "next/image";

export default function CartItemsList() {
  const { cart } = useCartContext();
  return (
    <div>
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
