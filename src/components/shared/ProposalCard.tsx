"use client";
import useCountdown from "@/hooks/use-countdown";
import { cn, timeAgo } from "@/lib/utils";
import { Proposal } from "@/types/proposals";
import Link from "next/link";
import React from "react";
import RAvatar from "../ui/avatar-compose";

const ProposalCard = ({
  isClosed,
  data,
}: {
  isClosed?: boolean;
  data: Proposal;
}) => {
  const { days, hours, minutes } = useCountdown(data?.endDate);
  const status = () => {
    const currentDate = new Date().getTime();
    const endDate = new Date(data?.endDate).getTime();
    return endDate > currentDate ? "active" : "closed";
  };
  return (
    <Link
      href={`/communities/${data?.community?._id}/proposals/${data?._id}`}
      className="border border-alice-blue rounded-lg p-5 bg-white block"
    >
      <div className="flex items-center justify-between mb-18">
        <div className="flex items-center space-x-[0.625rem]">
          <RAvatar
            src={data?.author?.profilePhoto?.url}
            className="size-[2.5rem] bg-athens"
          />
          <span>
            <h4 className="text-mako font-medium text-sm capitalize">
              {data?.author?.username}
            </h4>
            <h5 className="text-xs text-gray">
              {timeAgo(new Date(data?.createdAt))}
            </h5>
          </span>
        </div>
        <span
          className={cn(
            "flex items-center justify-center space-x-2 text-xs text-apple bg-beige rounded-full py-1 px-[0.875rem]",
            {
              "bg-red-100 text-red-600": isClosed || status() === "closed",
            }
          )}
        >
          <span
            className={cn("rounded-full bg-emerald size-2 inline-block", {
              "bg-red-500": isClosed || status() === "closed",
            })}
          ></span>
          <span className="inline-block capitalize">
            {isClosed ? "Closed" : status()}
          </span>
        </span>
      </div>
      <h2 className="font-medium text-sm mb-[0.4375rem] text-mako">
        {data?.title}
      </h2>
      <p className="text-xs text-mako whitespace-pre-wrap">
        {data?.description}
      </p>
      <span className="mt-5 flex items-center space-x-[0.375rem] text-xs text-mako">
        <span>Proposal ends in:</span>
        {days === 0 && hours === 0 && minutes === 0 ? (
          <span className="text-sm font-medium">Ended</span>
        ) : (
          <span className="text-sm font-medium">
            {days}d {hours}h {minutes}m
          </span>
        )}
      </span>
    </Link>
  );
};

export default ProposalCard;
