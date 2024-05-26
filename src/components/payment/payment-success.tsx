"use client";
import { OrderStatus, PaymentStatus } from "@/enum/order";
import { ORDERS_LIST_BASE_URL } from "@/routes/routes";
import { updateOrderByCode } from "@/services/order.service";
import { Order } from "@/types/order.type";
import { formatMoney } from "@/utils/format-money";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export enum PaymentVNPayStatusCode {
  SUCCESS = "00",
  UNDONE = "01",
  ERROR = "02",
}

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const vnp_Amount = Number(searchParams.get("vnp_Amount")) / 100;
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");

  const [orderUpdateResult, setOrderUpdateResult] = useState<Order | undefined>(
    undefined
  );
  console.log(vnp_OrderInfo, vnp_TransactionStatus);
  useEffect(() => {
    const updateOrderByOrderCode = async () => {
      if (vnp_OrderInfo) {
        const orderCode = vnp_OrderInfo.split(" ")[4];
        let updatedOrder: Order | undefined;
        if (vnp_TransactionStatus === PaymentVNPayStatusCode.SUCCESS) {
          updatedOrder = await updateOrderByCode({
            orderCode,
            paymentStatus: PaymentStatus.PAID,
          });
        } else {
          updatedOrder = await updateOrderByCode({
            orderCode,
            orderStatus: OrderStatus.CANCELLED,
          });
        }
        console.log(updatedOrder);
        setOrderUpdateResult(updatedOrder);
      }
    };
    updateOrderByOrderCode();
  }, [vnp_OrderInfo, vnp_TransactionStatus]);

  let textResult;
  let textColor;
  switch (vnp_TransactionStatus) {
    case PaymentVNPayStatusCode.SUCCESS:
      textResult = "Thanh toán thành công";
      textColor = "text-green-700";
      break;
    case PaymentVNPayStatusCode.UNDONE:
      textResult = "Thanh toán chưa hoàn tất";
      textColor = "text-red-700";
      break;
    case PaymentVNPayStatusCode.ERROR:
      textResult = "Thanh toán thất bại";
      textColor = "text-red-700";
      break;
    default:
      textResult = "Trạng thái không xác định";
      textColor = "text-gray-700";
  }

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white shadow-md rounded-md">
      <h1 className={`text-2xl text-center font-bold mb-4 ${textColor}`}>
        {textResult}
      </h1>
      <div className="flex justify-center mb-10">
        {vnp_TransactionStatus === PaymentVNPayStatusCode.SUCCESS ? (
          <Image
            src={"/images/done_payment.svg"}
            alt="success"
            width={50}
            height={50}
          />
        ) : (
          <Image
            src={"/images/error-payment.svg"}
            alt="success"
            width={50}
            height={50}
          />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-lg font-medium">Số tiền:</p>
          <p className="text-gray-600">{formatMoney(vnp_Amount)}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Mã giao dịch ngân hàng:</p>
          <p className="text-gray-600">
            {vnp_BankTranNo ?? "Chưa hoàn tất thanh toán"}
          </p>
        </div>
        <div>
          <p className="text-lg font-medium">Thông tin đơn hàng:</p>
          <p className="text-gray-600">{vnp_OrderInfo}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Ngày thanh toán:</p>
          <p className="text-gray-600">{vnp_PayDate}</p>
        </div>
        <div>
          <p className="text-lg font-medium">Mã giao dịch:</p>
          <p className="text-gray-600">{vnp_TransactionNo}</p>
        </div>
      </div>
      <div className="mt-8">
        <Link
          href={ORDERS_LIST_BASE_URL + "/" + orderUpdateResult?._id ?? ""}
          className="text-blue-600"
        >
          Xem chi tiết đơn hàng
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
