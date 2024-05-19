"use client";
import { ProfileSideBar } from "@/components/profile/profile-nav";
import { useAppContext } from "@/contexts/app-context";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import React from "react";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { openLoginForm } = useAppContext();
  const { user, isAuthenticating } = useAuthContext();
  if (isAuthenticating) return null;
  if (!user.isAuthenticated) {
    router.push("/");
    openLoginForm();
  }
  if (!user.isAuthenticated) return null;
  return (
    <div className="lg:grid grid-cols-7 lg:mt-10">
      <div className="col-span-2 min-h-screen">
        <ProfileSideBar />
      </div>
      <div className="col-span-5 ml-10">{children}</div>
    </div>
  );
}
