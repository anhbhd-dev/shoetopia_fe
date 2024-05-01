"use client";
import { PROFILE_BASE_URL } from "@/routes/routes";
import { ArchiveBoxIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import Link from "next/link";

export function ProfileSideBar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <List>
        <Link href={PROFILE_BASE_URL}>
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Thông tin cá nhân
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <ArchiveBoxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Đơn hàng
        </ListItem>
      </List>
    </Card>
  );
}
