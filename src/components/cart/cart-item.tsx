import { formatMoney } from "@/utils/format-money";
import React from "react";
import { Image } from "antd";
import { CartItem } from "@/types/cart";
import { useCartContext } from "@/contexts/cart-context";
import toast from "react-hot-toast";
import Link from "next/link";
import { PRODUCTS_LIST_BASE_URL } from "@/routes/routes";

export type CartItemProps = {
  item?: CartItem;
};
export default function CartItemRow({ item }: CartItemProps) {
  const { removeFromCart, updateCartItemQuantity } = useCartContext();
  const [errText, setErrText] = React.useState("");
  const [quantityInput, setQuantityInput] = React.useState(item?.quantity ?? 1);
  const handleRemoveItemFormCart = async () => {
    removeFromCart({ variationId: item?.variation?._id });
    toast.success("Đã xoá 1 item khỏi giỏ hàng.", {
      duration: 3000,
      style: {
        background: "#fff",
        color: "#333",
      },
      iconTheme: {
        primary: "#61d345",
        secondary: "#fff",
      },
    });
  };

  const handlePlusMinusQuantity = (value: number) => {
    const newQuantity = quantityInput + value;
    setQuantityInput(newQuantity);
  };

  React.useEffect(() => {
    const updateQuantity = async () => {
      const updatedQuantityRes = await updateCartItemQuantity({
        variationId: item?.variation?._id ?? "",
        quantity: quantityInput,
      });
      if (
        updatedQuantityRes &&
        (updatedQuantityRes as any)?.response?.status !== 201
      ) {
        setErrText(
          (updatedQuantityRes as any)?.response?.data?.message ??
            "Có lỗi xảy ra"
        );
        return;
      } else {
        setErrText("");
      }
    };

    updateQuantity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantityInput, item?.variation?._id]);

  const handleChangeQuantityInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    // Sử dụng regex để kiểm tra nếu là số và lớn hơn 0
    if (/^[1-9][0-9]*$/.test(value)) {
      // Chỉ thiết lập state nếu giá trị là số và lớn hơn 0
      setQuantityInput(Number(value));
    }
  };

  return (
    <div className="justify-between mb-6 rounded-lg bg-white p-3 pr-5 shadow-md sm:flex sm:justify-start">
      <div className="w-[200px]">
        <Image
          src={item?.avatar}
          width={120}
          height={120}
          className=" rounded-lg object-cover"
          alt={item?.name}
        />
      </div>
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 flex flex-col justify-between sm:mt-0">
          <Link href={`${PRODUCTS_LIST_BASE_URL}/${item?.productId}`}>
            <h2 className="text-lg font-semibold text-gray-900">
              {item?.name}
            </h2>
          </Link>
          <p className="mt-1 text-xs text-gray-700">{item?.variation?.size}</p>
          <p className="text-sm">
            {formatMoney(item?.variation?.salePrice ?? 0)}
          </p>
        </div>
        <div className="mt-4 w-[160px] flex justify-between">
          <div className="flex items-center border-gray-100 relative">
            <button
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-black hover:text-blue-50"
              onClick={() => handlePlusMinusQuantity(-1)}
            >
              -
            </button>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="text"
              onChange={handleChangeQuantityInput}
              value={quantityInput}
              min="1"
            />
            <button
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-blue-50"
              onClick={() => handlePlusMinusQuantity(1)}
            >
              +
            </button>
            {errText && (
              <p className="absolute bottom-0 -left-56 whitespace-nowrap text-red-700 text-sm">
                {errText}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 lg:hover:text-red-400 cursor-pointer"
              onClick={handleRemoveItemFormCart}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
