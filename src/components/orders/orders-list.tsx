"use client";
import React from "react";
import OrderItem from "./order-item";

export default function OrderList() {
  return (
    <div className="mt-4">
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </div>
  );
}
