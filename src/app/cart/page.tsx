import CartItemsList from "@/components/cart/cart-items-list";
import SubTotal from "@/components/cart/sub-total";
import { Typography } from "@material-tailwind/react";
import React from "react";

export default function page() {
  return (
    <div className="lg:mt-20">
      <h2 className="text-2xl font-bold lg:mb-8">Giỏ hàng</h2>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-3">
          <CartItemsList />
        </div>
        <div className="col-span-2">
          <SubTotal />
        </div>
      </div>
    </div>
  );
}
