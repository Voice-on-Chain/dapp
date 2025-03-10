"use client";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  currentPage?: number;
  totalPages?: number;
  className?: string;
}

const Pagination = ({ className, currentPage = 1, totalPages = 1 }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div
      className={cn(
        "border-t border-alice-blue pt-[0.6875rem] pb-4 px-4 lg:px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
        className
      )}
    >
      <span className="text-xs lg:text-sm text-slate-grey flex items-center space-x-2">
        <span>Page</span>
        <span className="border border-gainsboro px-[1.0625rem] py-[0.5625rem] shadow-btn rounded-md">
          {currentPage}
        </span>
        <span>of {totalPages}</span>
      </span>
      <span className="flex items-center space-x-2 text-xs text-slate-grey lg:text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => createPageURL(currentPage - 1)}
          className="rounded-md border border-gainsboro disabled:opacity-50 disabled:cursor-not-allowed px-[1.0625rem] py-[0.5625rem] shadow-btn"
        >
          Prev
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => createPageURL(currentPage - 1)}
          className="rounded-md border border-gainsboro disabled:opacity-50 disabled:cursor-not-allowed px-[1.0625rem] py-[0.5625rem] shadow-btn"
        >
          Next
        </button>
      </span>
    </div>
  );
};

export default Pagination;
