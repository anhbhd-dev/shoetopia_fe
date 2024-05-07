"use client";
import { OrderItemSkeleton } from "@/components/orders/order-item";
import OrderList from "@/components/orders/orders-list";
import { OrdersNav } from "@/components/orders/orders-nav";
import { OrderStatus } from "@/enum/order";
import { fetchUserOrders } from "@/services/order.service";
import React, { useEffect } from "react";

export default function OrdersListing() {
  const [orders, setOrders] = React.useState();
  const [filter, setFilter] = React.useState<{ orderStatus?: OrderStatus }>({
    orderStatus: OrderStatus.PENDING,
  });
  const [isLoadingOrders, setIsLoadingOrders] = React.useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetchUserOrders(filter);
      setOrders(response.orders);
      setIsLoadingOrders(false);
    };
    fetchOrders();
  }, [filter]);

  return (
    <div>
      <OrdersNav
        setIsLoadingOrders={setIsLoadingOrders}
        setFilter={setFilter}
        filter={filter}
      />
      {isLoadingOrders ? (
        Array.from({ length: 3 }).map((_, i) => <OrderItemSkeleton key={i} />)
      ) : (
        <OrderList orders={orders} />
      )}
    </div>
  );
}
