"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  routes: string[];
  active: string;
  paramKey?: string;
}

const Tabs = ({ routes, active, paramKey = "status" }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const tabHandler = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramKey, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className="flex items-center space-x-[0.625rem]">
      {routes.map((route, index) => (
        <li key={index}>
          <button
            onClick={() => tabHandler(route)}
            className={cn(
              "text-xs lg:text-sm capitalize bg-white text-dove-gray rounded-lg px-4 py-[0.625rem]",
              {
                "border-b-2 border-accent drop-shadow-tab": route === active,
              }
            )}
          >
            <span>{route}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Tabs;
