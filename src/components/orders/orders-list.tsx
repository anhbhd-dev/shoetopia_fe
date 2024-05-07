"use client";
import { Order } from "@/types/order.type";
import OrderItem, { OrderItemSkeleton } from "./order-item";
import Image from "next/image";

export type OrderListProps = {
  orders?: Order[];
};

export default function OrderList({ orders }: OrderListProps) {
  if (orders?.length === 0)
    return (
      <div className="mt-10 flex flex-col gap-6 items-center justify-center">
        <Image
          src="/images/empty-order.png"
          alt="empty"
          width={200}
          height={200}
        />
        <p>Không có đơn hàng nào tương ứng</p>
      </div>
    );

  return (
    <div className="mt-4">
      {!orders
        ? Array.from({ length: 4 }).map((_, i) => <OrderItemSkeleton key={i} />)
        : orders?.map((order) => <OrderItem key={order._id} order={order} />)}
    </div>
  );
}
