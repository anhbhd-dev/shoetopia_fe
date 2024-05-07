import { PaymentMethod } from "@/enum/order";
import { ORDERS_LIST_BASE_URL } from "@/routes/routes";
import { Order } from "@/types/order.type";
import { formatMoney } from "@/utils/format-money";
import Image from "next/image";
import Link from "next/link";
export type OrderItemType = {
  order?: Order;
};

export default function OrderItem({ order }: OrderItemType) {
  const avatar = order?.orderItems?.[0]?.product?.avatar;
  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-3 pr-5 shadow-md border sm:flex sm:justify-start">
      <div className="h-[100px] w-[120px]">
        <Image
          src={typeof avatar === "string" ? avatar : ""}
          width={100}
          height={100}
          className=" h-full rounded-lg object-cover"
          alt={""}
        />
      </div>
      <div className="sm:ml-4 sm:w-[400px] flex flex-col justify-between">
        <p className="font-semibold">{order?.orderCode}</p>
        <p className="text-sm">
          Giá trị đơn hàng: {formatMoney(order?.totalAmount ?? 0)}
        </p>
        <p className="text-sm">
          Phương thức thanh toán:{" "}
          {order?.payment?.paymentMethod === PaymentMethod.CASH_ON_DELIVERY
            ? "COD"
            : "Online"}
        </p>
      </div>
      <div className="w-[100px] ml-[200px] flex items-center mr-5 font-semibold underline text-sm justify-end">
        <Link href={ORDERS_LIST_BASE_URL + "/" + order?._id}>Chi tiết</Link>
      </div>
    </div>
  );
}

import { Typography } from "@material-tailwind/react";

export function OrderItemSkeleton() {
  return (
    <div className="max-w-full animate-pulse flex justify-between mb-6 rounded-lg bg-white p-3 pr-5 shadow-md border sm:flex sm:justify-start">
      <div className="h-[100px] w-[120px] relative">
        <div className="h-full w-full rounded-lg bg-gray-300"></div>
      </div>
      <div className="sm:ml-4 sm:w-[400px] flex flex-col justify-between">
        <Typography
          as="div"
          variant="h1"
          className="font-semibold mb-1 h-3 w-48 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="text-sm mb-2 h-2 w-72 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className="text-sm mb-2 h-2 w-72 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
      <div className="w-[100px] ml-[200px] flex items-center mr-5 font-semibold underline text-sm justify-end">
        <Typography
          as="div"
          variant="paragraph"
          className="h-3 w-24 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      </div>
    </div>
  );
}
