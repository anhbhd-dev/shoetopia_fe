"use client";
import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import {
  PRODUCTS_LIST_BASE_URL,
  BASE_URL,
  CART_BASE_URL,
  PROFILE_BASE_URL,
} from "@/routes/routes";
import Image from "next/image";
import { useAppContext } from "@/contexts/app-context";
import { useAuthContext } from "@/contexts/auth-context";
import { useCartContext } from "@/contexts/cart-context";
export function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { openLoginForm, openSignUpForm } = useAppContext();
  const { user, isAuthenticating } = useAuthContext();

  const { cart } = useCartContext();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = isAuthenticating ? (
    <SkeletonLoadingNavItem />
  ) : (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <div className="flex gap-5">
          <Link
            href={PRODUCTS_LIST_BASE_URL}
            className="flex items-center text-sm font-semibold uppercase"
          >
            Sản phẩm
          </Link>
          {user.isAuthenticated && !isAuthenticating && (
            <>
              <Link
                href={CART_BASE_URL}
                className="flex items-center text-sm font-semibold uppercase"
              >
                <div className="w-6 relative">
                  <Image
                    src="/images/shopping-cart.png"
                    alt="shopping-cart"
                    width={24}
                    height={24}
                  />
                  <div className="rounded-full bg-red-500 absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-xs text-white">
                    {cart.items.length ?? 0}
                  </div>
                </div>
              </Link>
              <Link
                href={PROFILE_BASE_URL}
                className="flex items-center text-sm font-semibold uppercase"
              >
                <div className="w-6 relative">
                  <Image
                    src="/images/user.png"
                    alt="shopping-cart"
                    width={24}
                    height={24}
                  />
                </div>
              </Link>
            </>
          )}
        </div>
      </Typography>
    </ul>
  );

  return (
    <div className="max-h-[768px] sticky top-0 z-10">
      <Navbar className="h-max max-w-full rounded-none px-4 py-2 lg:px-40 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            href={BASE_URL}
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Material Tailwind
          </Link>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>

            {!user.isAuthenticated && !isAuthenticating && (
              <div className="flex items-center gap-x-1">
                <Button
                  onClick={openLoginForm}
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Log In</span>
                </Button>
                <Button
                  onClick={openSignUpForm}
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Sign Up</span>
                </Button>
              </div>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign Up</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}

const SkeletonLoadingNavItem = () => (
  <li className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <div className="p-1 font-normal">
      <div className="flex gap-2">
        <div className="flex items-center text-sm font-semibold uppercase animate-pulse">
          <div className="w-14 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center text-sm font-semibold uppercase animate-pulse">
          <div className="w-14 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center text-sm font-semibold uppercase animate-pulse">
          <div className="w-14 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center text-sm font-semibold uppercase animate-pulse">
          <div className="w-14 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center text-sm font-semibold uppercase animate-pulse">
          <div className="w-14 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  </li>
);
