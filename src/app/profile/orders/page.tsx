"use client";
import OrderList from "@/components/orders/orders-list";
import { OrdersNav } from "@/components/orders/orders-nav";
import { fetchUserCart } from "@/services/cart.service";
import { fetchUserOrders } from "@/services/order.service";
import React, { useEffect } from "react";

export default function OrdersListing() {
  const [orders, setOrders] = React.useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetchUserOrders();
      setOrders(response);
    };
    fetchOrders();
  }, []);

  console.log(orders);
  return (
    <div>
      <OrdersNav />
      <OrderList />
    </div>
  );
}
