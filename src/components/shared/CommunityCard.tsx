"use client";
import useUser from "@/hooks/use-user";
import { formatLargeNumber } from "@/lib/utils";
import { Community } from "@/types/community";
import Link from "next/link";
import React, { useMemo } from "react";
import RAvatar from "../ui/avatar-compose";
import { useAccount } from "wagmi";

const CommunityCard = ({ data }: { data: Community }) => {
  const { user } = useUser();
  const { address } = useAccount();

  const isAMember = useMemo(() => {
    if (user) {
      return data?.members?.find((member) => member === user?._id);
    }
    return false;
  }, [user, data]);

  return (
    <div className="bg-white py-4 px-[1.375rem] rounded-xl border border-white-smoke-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-[0.5625rem]">
          <RAvatar
            src={data?.logo?.url}
            className="size-[2.5rem] inline-block rounded-full bg-athens"
          />
          <div>
            <h4 className="font-medium text-mako text-sm capitalize">
              {data?.name}
            </h4>
            <h5 className="text-xs text-gray">
              {formatLargeNumber(data?.members?.length)}{" "}
              {data?.members?.length > 1 ? "Holders" : "Holder"}
            </h5>
          </div>
        </div>
        <Link
          href={`/communities/${data?._id}`}
          className="bg-accent px-4 py-2.5 hover:bg-teal block text-white font-medium text-sm rounded-lg"
        >
          {data?.creator?.address === address || isAMember ? "View" : "Join"}
        </Link>
      </div>
      <p className="text-sm text-gray line-clamp-3 first-letter:capitalize">
        {data?.description}
      </p>
    </div>
  );
};

export default CommunityCard;
