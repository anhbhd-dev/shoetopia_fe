import OrderList from "@/components/orders/orders-list";
import { OrdersNav } from "@/components/orders/orders-nav";
import React from "react";

export default function OrdersListing() {
  return (
    <div>
      <OrdersNav />
      <OrderList />
    </div>
  );
}
