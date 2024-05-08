"use client";
import { useCartContext } from "@/contexts/cart-context";
import { PaymentMethod } from "@/enum/order";
import { CHECKOUT_BASE_URL } from "@/routes/routes";
import {
  createOrder,
  createPaymentOnlineVNPayUrl,
} from "@/services/order.service";
import { Order } from "@/types/order.type";
import { formatMoney } from "@/utils/format-money";
import Button from "@material-tailwind/react/components/Button";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function SubTotal() {
  const router = useRouter();
  const { cart, checkOutInformation, fetchCart } = useCartContext();
  const pathname = usePathname();
  const [orderResponse, setOrderResponse] = useState<Order>();
  const isOnCheckoutPage = useMemo(
    () => pathname.startsWith(CHECKOUT_BASE_URL),
    [pathname]
  );

  const handlePlaceOrder = async () => {
    if (checkOutInformation) {
      try {
        const orderResponse: Order = await createOrder(checkOutInformation);
        setOrderResponse(orderResponse);

        if (
          orderResponse &&
          checkOutInformation.payment?.paymentMethod === PaymentMethod.VNPAY
        ) {
          const orderDesc = "Thanh toan cho order: " + orderResponse.orderCode;
          const urlOnlinePaymentVNPay = await createPaymentOnlineVNPayUrl({
            totalAmount: orderResponse.totalAmount ?? 0,
            orderDescription: orderDesc,
          });

          if (urlOnlinePaymentVNPay) {
            router.push(urlOnlinePaymentVNPay.vnpUrl);
            fetchCart();
          }
        }

        if (
          orderResponse &&
          checkOutInformation.payment?.paymentMethod ===
            PaymentMethod.CASH_ON_DELIVERY
        ) {
          fetchCart();
          toast.success("Đặt hàng thành công.", {
            duration: 2000,
            style: {
              background: "#fff",
            },
            iconTheme: {
              primary: "#61d345",
              secondary: "#fff",
            },
          });
          router.push("/");
        }
      } catch (err) {
        toast.error("Đã có lỗi xảy ra.", {
          duration: 2000,
          style: {
            background: "#fff",
          },
        });
      }
    }
  };

  const handleGoToCheckoutPage = () => {
    router.push(CHECKOUT_BASE_URL);
  };
  return (
    <div className="rounded-lg border bg-white p-6 shadow-md ">
      <p className="text-xl font-bold lg:mb-5">Thông tin thanh toán</p>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Tổng tiền hàng</p>
        <p className="text-gray-700">{formatMoney(cart.totalPrice ?? 0)}</p>
      </div>
      <div className="flex mb-2 justify-between">
        <p className="text-gray-700">Phần trăm phí vận chuyển</p>
        <p className="text-gray-700">{cart.shippingFeePercentage ?? 0}%</p>
      </div>
      <div className="flex mb-2 justify-between">
        <p className="text-gray-700">Phí vận chuyển</p>
        <p className="text-gray-700">{formatMoney(cart.shippingFee ?? 0)}</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">
            {formatMoney(cart.totalAmount ?? 0)}
          </p>
        </div>
      </div>
      {isOnCheckoutPage && (
        <Button
          onClick={handlePlaceOrder}
          disabled={
            !checkOutInformation?.receiverName ||
            !checkOutInformation?.phoneNumber ||
            !checkOutInformation?.shippingAddress ||
            cart?.items?.length === 0
          }
          className="mt-6 w-full rounded-md  bg-black py-2 font-medium text-white hover:bg-blue-gray-900"
        >
          Đặt hàng
        </Button>
      )}
      {!isOnCheckoutPage && (
        <Button
          disabled={cart?.items?.length === 0}
          onClick={handleGoToCheckoutPage}
          className="mt-6 w-full rounded-md bg-black py-3 font-medium text-white hover:bg-blue-gray-900"
        >
          Tới trang thanh toán
        </Button>
      )}
    </div>
  );
}
