"use client";
import { ORDERS_LIST_BASE_URL, PROFILE_BASE_URL } from "@/routes/routes";
import { ArchiveBoxIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileSideBar() {
  const pathName = usePathname();

  return (
    <Card className="h-full w-full max-w-[20rem] p-4">
      <List>
        <Link href={PROFILE_BASE_URL}>
          <ListItem
            className={pathName.includes(PROFILE_BASE_URL) ? "bg-gray-200" : ""}
          >
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Thông tin cá nhân
          </ListItem>
        </Link>
        <Link href={ORDERS_LIST_BASE_URL}>
          <ListItem
            className={
              pathName.includes(ORDERS_LIST_BASE_URL) ? "bg-gray-200" : ""
            }
          >
            <ListItemPrefix>
              <ArchiveBoxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Đơn hàng
          </ListItem>
        </Link>
      </List>
    </Card>
  );
}
