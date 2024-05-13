"use client";
import { Button, Navbar, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";

// export function OrdersNav() {
//   const [openNav, setOpenNav] = React.useState(false);

//   React.useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setOpenNav(false)
//     );
//   }, []);

//   const navList = (
//     <ul className="mt-2 mb-4 flex gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2">
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <Button
//           variant="outlined"
//           className="flex text-xs whitespace-nowrap items-center"
//         >
//           Đang chờ duyệt
//         </Button>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <Button
//           variant="outlined"
//           className="flex text-xs whitespace-nowrap items-center"
//         >
//           Đang xử lý
//         </Button>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <Button
//           variant="outlined"
//           className="flex text-xs whitespace-nowrap items-center"
//         >
//           Đang giao hàng
//         </Button>
//       </Typography>
//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <Button
//           variant="outlined"
//           className="flex text-xs whitespace-nowrap items-center"
//         >
//           Đã giao hàng
//         </Button>
//       </Typography>

//       <Typography
//         as="li"
//         variant="small"
//         color="blue-gray"
//         className="p-1 font-normal"
//       >
//         <Button
//           variant="outlined"
//           className="flex text-xs whitespace-nowrap items-center"
//         >
//           Đã huỷ
//         </Button>
//       </Typography>
//     </ul>
//   );

//   return (
//     <div className="max-h-[768px] lg:mt-8">
//       <div className="mr-4 hidden lg:block">{navList}</div>
//     </div>
//   );
// }

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { OrderStatus } from "@/enum/order";
import { useDebounce } from "@/hooks/useDebounce";

export type OrderNavProps = {
  setFilter: React.Dispatch<
    React.SetStateAction<{
      orderStatus?: OrderStatus | undefined;
    }>
  >;
  filter: {
    orderStatus?: OrderStatus | undefined;
  };
  setIsLoadingOrders: React.Dispatch<React.SetStateAction<boolean>>;
};

export function OrdersNav({
  filter,
  setFilter,
  setIsLoadingOrders,
}: OrderNavProps) {
  const [activeTab, setActiveTab] = React.useState(filter.orderStatus);
  const tabValueDebounced = useDebounce(activeTab, 500);
  const data = [
    {
      label: "Đang chờ duyệt",
      value: OrderStatus.PENDING,
    },
    {
      label: "Đang xử lý",
      value: OrderStatus.PROCESSING,
    },
    {
      label: "Đang giao hàng",
      value: OrderStatus.SHIPPING,
    },
    {
      label: "Đã giao hàng",
      value: OrderStatus.DELIVERED,
    },
    {
      label: "Đã huỷ",
      value: OrderStatus.CANCELLED,
    },
  ];
  useEffect(() => {
    if (tabValueDebounced) {
      setFilter((prev) => ({ ...prev, orderStatus: tabValueDebounced }));
    }
  }, [setFilter, tabValueDebounced]);
  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 z-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => {
              setActiveTab(value);
              setIsLoadingOrders(true);
            }}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value }) => (
          <TabPanel key={value} value={value}>
            {null}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
