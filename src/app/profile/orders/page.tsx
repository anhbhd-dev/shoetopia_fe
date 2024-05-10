"use client";
import { OrderItemSkeleton } from "@/components/orders/order-item";
import OrderList from "@/components/orders/orders-list";
import { OrdersNav } from "@/components/orders/orders-nav";
import { OrderStatus } from "@/enum/order";
import { fetchUserOrders } from "@/services/order.service";
import { Order } from "@/types/order.type";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect } from "react";

export default function OrdersListing() {
  const [orders, setOrders] = React.useState<Order[] | undefined>();
  const [filter, setFilter] = React.useState<{
    orderStatus?: OrderStatus;
    page?: number;
    totalPage?: number;
  }>({
    orderStatus: OrderStatus.PENDING,
    page: 1,
  });
  const [isLoadingOrders, setIsLoadingOrders] = React.useState(true);
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetchUserOrders(filter);
      setOrders(response.orders);
      setFilter({
        ...filter,
        totalPage: response.totalPage,
      });
      setIsLoadingOrders(false);
    };
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.orderStatus, filter.page, filter.totalPage]);

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
        <>
          <OrderList orders={orders} />
          {Boolean(orders?.length) && (
            <OrderPagination setFilter={setFilter} filter={filter} />
          )}
        </>
      )}
    </div>
  );
}
export type OrderPaginationProps = {
  setFilter: React.Dispatch<
    React.SetStateAction<{
      orderStatus?: OrderStatus | undefined;
      page?: number | undefined;
      totalPage?: number | undefined;
    }>
  >;
  filter: {
    orderStatus?: OrderStatus | undefined;
    page?: number | undefined;
    totalPage?: number | undefined;
  };
};
export function OrderPagination({ filter, setFilter }: OrderPaginationProps) {
  const getItemProps = (pageNumber: number) =>
    ({
      variant: filter?.page === pageNumber ? "filled" : "text",
      color: "gray",
      onClick: () => setFilter((prev) => ({ ...prev, page: pageNumber })),
    } as any);

  const next = () => {
    if (filter?.page === filter?.totalPage) return;

    setFilter((prev) => ({
      ...prev,
      page: (prev.page ?? 0) + 1,
    }));
  };
  const prev = () => {
    if (filter?.page === 1) return;

    setFilter((prev) => ({
      ...prev,
      page: (prev.page ?? 0) - 1,
    }));
  };

  return (
    <div className="flex items-center gap-4 justify-end lg:mt-10">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={filter?.page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: filter?.totalPage ?? 0 }).map((_, i) => (
          <IconButton key={i} {...getItemProps(i + 1)}>
            {i + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={filter?.page === filter?.totalPage}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
