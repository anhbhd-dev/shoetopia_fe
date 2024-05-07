"use client";
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/enum/order";
import { fetchOrderById } from "@/services/order.service";
import { Order } from "@/types/order.type";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Image } from "antd";
import { formatMoney } from "@/utils/format-money";
export default function OrderDetails() {
  const [isFetchingOrder, setIsFetchingOrder] = React.useState(false);
  const [order, setOrder] = React.useState<Order>();
  const { slug } = useParams();
  useEffect(() => {
    setIsFetchingOrder(true);
    const fetchOrder = async () => {
      try {
        if (slug) {
          const response = await fetchOrderById(slug as string);
          setOrder(response);
        }
      } catch (err) {
        toast.error("Đã có lỗi xảy ra.", {
          duration: 2000,
          style: {
            background: "#fff",
          },
        });
      } finally {
        setIsFetchingOrder(false);
      }
    };
    fetchOrder();
  }, [slug]);
  const orderStatus = order?.orderStatus?.slice(-1)[0];
  return (
    <main>
      <div>
        <h1 className="text-2xl font-semibold mb-10">{order?.orderCode}</h1>
        <div className="flex gap-5 mb-5">
          <p className="min-w-[200px]">Trạng thái đơn hàng</p>
          <p>
            {orderStatus === OrderStatus.PENDING && (
              <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                {orderStatus}
              </span>
            )}
            {orderStatus === OrderStatus.PROCESSING && (
              <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                {orderStatus}
              </span>
            )}
            {orderStatus === OrderStatus.SHIPPING && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {orderStatus}
              </span>
            )}
            {orderStatus === OrderStatus.DELIVERED && (
              <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                {orderStatus}
              </span>
            )}
            {orderStatus === OrderStatus.CANCELLED && (
              <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                {orderStatus}
              </span>
            )}
          </p>
        </div>

        <div className="flex gap-5 mb-5">
          <p className="min-w-[200px]">Người nhận hàng</p>
          <p>{order?.receiverName}</p>
        </div>
        <div className="flex gap-5 mb-5">
          <p className="min-w-[200px]">Địa chỉ nhận hàng</p>
          <p>{order?.shippingAddress}</p>
        </div>
        <div className="flex gap-5 mb-5">
          <p className="min-w-[200px]">Số điện thoại nhận hàng</p>
          <p>{order?.phoneNumber}</p>
        </div>
      </div>

      <div className="my-14 mb-8 text-xl font-bold">Các sản phẩm đã mua</div>
      <div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 w-[250px] text-ellipsis">
                  Tên sản phẩm
                </th>
                <th scope="col" className="py-3">
                  Avatar
                </th>
                <th scope="col" className="py-3">
                  Size
                </th>
                <th scope="col" className="py-3">
                  Số lượng
                </th>
                <th scope="col" className="py-3">
                  Đơn giá
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((item) => {
                return (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black"
                  >
                    <th
                      scope="row"
                      className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item?.product?.name}
                    </th>
                    <td className="py-4 w-32">
                      <Image
                        className="rounded-lg"
                        src={item?.product?.avatar}
                        width={"80px"}
                        alt="Dan Abram"
                      />
                    </td>
                    <td className="py-4 w-32">{item?.variation?.size}</td>
                    <td className="py-4 w-32">{item?.quantity}</td>
                    <td className="py-4 w-32">
                      {formatMoney(item.price ?? 0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-14 mb-8 text-xl font-bold">Thông tin thanh toán</div>

      <div className="flex gap-5 mb-5">
        <p className="min-w-[200px]">Phương thức thanh toán</p>
        <p>
          {order?.payment?.paymentMethod === PaymentMethod.CASH_ON_DELIVERY
            ? "COD"
            : "Online banking"}{" "}
        </p>
      </div>
      <div className="flex gap-5 mb-5">
        <p className="min-w-[200px]">Trạng thái thanh toán</p>
        <p>
          {order?.payment?.paymentStatus === PaymentStatus.PAID ? (
            <span className="bg-green-100 text-green-800 text-sm  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Đã thanh toán
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-800  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 text-sm">
              Chưa thanh toán
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-5 mb-5">
        <p className="min-w-[200px]">Phần trăm phí vận chuyển</p>
        <p>{order?.shippingFeePercentage || 0}%</p>
      </div>
      <div className="flex gap-5 mb-5">
        <p className="min-w-[200px]">Phí vận chuyển</p>
        <p>{formatMoney(order?.shippingFee || 0)}</p>
      </div>
      <div className="flex gap-5 mb-5">
        <p className="min-w-[200px]">Tổng tiền hàng</p>
        <p>{formatMoney(order?.totalPrice || 0)}</p>
      </div>
      <div className="flex gap-5 mb-5">
        <p className="min-w-[200px]">Tổng giá trị đơn hàng</p>
        <p>{formatMoney(order?.totalAmount || 0)}</p>
      </div>
    </main>
  );
}

{
  /* <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Default</span>
<span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Dark</span>
<span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Red</span>
<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Green</span>
<span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Yellow</span>
<span class="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">Indigo</span>
<span class="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Purple</span>
<span class="bg-pink-100 text-pink-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Pink</span> */
}
