"use client";
import useUser from "@/hooks/use-user";
import Link from "next/link";
import React from "react";
import { BiSolidInfoCircle } from "react-icons/bi";
import { useAccount } from "wagmi";

const CompleteProfile = () => {
  const { address } = useAccount();
  const { user, isLoading } = useUser();
  return (
    <>
      {user?._id ? null : address && !isLoading ? (
        <div className="my-3 flex items-start lg:items-center space-x-3 border border-sun-glow bg-serenade rounded-lg py-4 px-5 text-xs lg:text-sm text-gamboge">
          <BiSolidInfoCircle size={24} />
          <p>
            Please complete your{" "}
            <Link
              href="/profile"
              className="underline inline-block underline-offset-1"
            >
              profile
            </Link>{" "}
            to properly interact with the application.
          </p>
        </div>
      ) : null}
    </>
  );
};

export default CompleteProfile;
