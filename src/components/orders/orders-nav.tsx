"use client";
import { Button, Navbar, Typography } from "@material-tailwind/react";
import React from "react";

export function OrdersNav() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Button
          variant="outlined"
          className="flex text-xs whitespace-nowrap items-center"
        >
          Đang chờ duyệt
        </Button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Button
          variant="outlined"
          className="flex text-xs whitespace-nowrap items-center"
        >
          Đang xử lý
        </Button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Button
          variant="outlined"
          className="flex text-xs whitespace-nowrap items-center"
        >
          Đang giao hàng
        </Button>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Button
          variant="outlined"
          className="flex text-xs whitespace-nowrap items-center"
        >
          Đã giao hàng
        </Button>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Button
          variant="outlined"
          className="flex text-xs whitespace-nowrap items-center"
        >
          Đã huỷ
        </Button>
      </Typography>
    </ul>
  );

  return (
    <div className="max-h-[768px] lg:mt-8">
      <div className="mr-4 hidden lg:block">{navList}</div>
    </div>
  );
}
