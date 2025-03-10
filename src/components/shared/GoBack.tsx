"use client";
import { useRouter } from "next/navigation";
import React from "react";
import BackIcon from "../custom-icons/BackIcon";

const GoBack = () => {
  const router = useRouter();
  const goBackHandler = () => {
    router.back();
  };

  return (
    <button
      onClick={goBackHandler}
      className="flex items-center text-slate-grey text-xs lg:text-sm space-x-[0.375rem] border border-gainsboro-4 rounded-md py-[0.5625rem] px-3 lg:px-[1.0625rem]"
    >
      <BackIcon />
      <span>Back</span>
    </button>
  );
};

export default GoBack;
