import { OrderItem } from "@/types/order.type";
import React, { useEffect } from "react";
import { Image } from "antd";
import { formatMoney } from "@/utils/format-money";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Rating,
} from "@material-tailwind/react";
import { OrderStatus } from "@/enum/order";
import { Textarea } from "@material-tailwind/react";
import {
  CreateReviewDto,
  addReview,
  checkIsAlreadyRated,
} from "@/services/review.service";
import toast from "react-hot-toast";
import Link from "next/link";
import { PRODUCTS_LIST_BASE_URL } from "@/routes/routes";
export type OrderItemProps = {
  item: OrderItem;
  orderStatus?: OrderStatus;
  setIsFetchingOrder: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function OrderItemInfo({
  item,
  orderStatus,
  setIsFetchingOrder,
}: OrderItemProps) {
  const [isExisted, setIsExisted] = React.useState(true);
  const [isCreatingReview, setIsCreatingReview] = React.useState(false);
  useEffect(() => {
    const checkIsRated = async () => {
      const res = await checkIsAlreadyRated(item.variation?._id ?? "");
      setIsExisted(res.isExisted);
    };
    checkIsRated();
  }, [item]);
  const handleSubmitReview = async (data: Partial<CreateReviewDto>) => {
    try {
      setIsCreatingReview(true);
      const createReviewResponse = await addReview({
        ...(data as any),
        variation: item.variation?._id ?? "",
      });
      setIsCreatingReview(false);
      setIsFetchingOrder((prev) => !prev);
      toast.success("Đánh giá thành công", {
        duration: 2000,
        style: {
          background: "#fff",
        },
        iconTheme: {
          primary: "#61d345",
          secondary: "#fff",
        },
      });
    } catch (err) {
      console.log(err);
      toast.error("Đánh giá thất bại đã xảy ra lỗi", {
        duration: 2000,
        style: {
          background: "#fff",
        },
      });
    } finally {
      setIsCreatingReview(false);
    }
  };

  return (
    <tr
      key={item._id}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-black"
    >
      <th
        scope="row"
        className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <Link href={PRODUCTS_LIST_BASE_URL + "/" + item?.product?._id}>
          {item?.product?.name}
        </Link>
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
      <td className="py-4 w-32">{formatMoney(item.price ?? 0)}</td>
      {orderStatus && orderStatus === OrderStatus.DELIVERED && !isExisted && (
        <td>
          <RateItemModal
            isCreatingReview={isCreatingReview}
            onReview={handleSubmitReview}
          />
        </td>
      )}
    </tr>
  );
}

type RateItemModalProps = {
  onReview: (data: Partial<CreateReviewDto>) => Promise<void>;
  isCreatingReview?: boolean;
};
export function RateItemModal({
  onReview,
  isCreatingReview,
}: RateItemModalProps) {
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(5);
  const [content, setContent] = React.useState("");
  const handleOpen = () => setOpen(!open);

  const handleClickSubmitReview = async () => {
    onReview({
      content,
      rating,
    });
    handleOpen();
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className="text-xs whitespace-nowrap"
        variant="gradient"
      >
        Đánh giá
      </Button>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader>Đánh giá sản phẩm.</DialogHeader>
        <DialogBody>
          <p>Chọn số sao muốn đánh giá</p>

          <div className="mb-6">
            <Rating value={rating} onChange={setRating} />
          </div>
          <div>
            <Textarea
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              label="Nhận xét"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="outlined"
            color="black"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Huỷ</span>
          </Button>
          <Button
            variant="gradient"
            color="black"
            onClick={handleClickSubmitReview}
            loading={isCreatingReview}
          >
            <span>Đăng nhận xét</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
