"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import { BsTelegram } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import { useAccount } from "wagmi";
import Search from "../ui/search-input";
import AccountMenu from "./AccountMenu";
import Sidebar from "./Sidebar";
import WalletConnectButton from "./WalletConnectButton";

const Navbar = () => {
  const { isConnected } = useAccount();

  return (
    <nav className="bg-white py-4 lg:py-[1.1875rem] border-b border-gainsboro px-4 lg:px-8">
      <div className="flex items-center justify-between lg:space-x-10 1xl:space-x-[3.21rem] w-full max-w-screen-2xl mx-auto">
        <div className="flex lg:space-x-14 1xl:space-x-[6.0625rem] items-center justify-between">
          <Link href="/">
            <Image
              priority
              src="/svgs/logo.svg"
              alt="Voice on Chain"
              width={182}
              height={24.55}
              className="xl:hidden"
            />
            <Image
              src="/svgs/logo.svg"
              alt="Voice on Chain"
              width={218.62}
              height={29.49}
              priority
              className="hidden xl:block"
            />
          </Link>
          <Suspense>
            <Search
              placeholder="Search VOC"
              className="hidden lg:block lg:w-[25rem] 1xl:w-[34.6875rem] max-w-full"
            />
          </Suspense>
        </div>
        <div className="hidden lg:flex space-x-4 items-center justify-between">
          <Link
            href="https://t.me/+XPaH4NzQVKg3YTE8"
            target="_blank"
            className="flex items-center space-x-2 border border-athens rounded-lg px-4 py-[0.5625rem]"
          >
            <BsTelegram color="#24A1DE" size={18} />
            {/* <span className="text-base font-medium text-mako">0</span> */}
            <span className="text-sm text-dove-gray font-normal">
              Join Telegram
            </span>
          </Link>
          <span className="border-l border-athens inline-block py-4" />
          {/* <span className="border-x border-athens px-4">
            <span className="flex items-center justify-center px-[0.5625rem] py-[0.625rem] border border-athens rounded-lg text-dove-gray">
              <NotificationIcon />
            </span>
          </span> */}
          {isConnected ? <AccountMenu /> : <WalletConnectButton />}
        </div>

        <Sheet>
          <SheetTrigger className="lg:hidden" asChild>
            <button className="lg:hidden flex items-center justify-center px-[0.5625rem] py-[0.625rem] border border-athens rounded-lg text-dove-gray">
              <IoMenu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent className="px-0 lg:hidden">
            <Sidebar className="block max-w-full border-none h-auto" />
            <div className="px-8 flex flex-col items-center space-y-3">
              <Link
                href="https://t.me/voiceonaptos"
                target="_blank"
                className="flex items-center w-full justify-center space-x-2 border border-athens rounded-lg px-4 py-[0.5625rem]"
              >
                <BsTelegram color="#24A1DE" size={18} />
                {/* <span className="text-base font-medium text-mako">0</span> */}
                <span className="text-sm text-dove-gray font-normal">
                  Join Telegram
                </span>
              </Link>
              {isConnected ? <AccountMenu /> : <WalletConnectButton />}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
