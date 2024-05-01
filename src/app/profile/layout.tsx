import { ProfileSideBar } from "@/components/profile/profile-nav";
import React from "react";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:grid grid-cols-7 lg:mt-10">
      <div className="col-span-2">
        <ProfileSideBar />
      </div>
      <div className="col-span-5">{children}</div>
    </div>
  );
}
