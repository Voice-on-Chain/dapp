import RAvatar from "@/components/ui/avatar-compose";
import { cn, formatDateToCustomString } from "@/lib/utils";
import { Proposal } from "@/types/proposals";
import React from "react";

const ProposalInfo = ({ data }: { data: Proposal }) => {
  const status = () => {
    const currentDate = new Date().getTime();
    const endDate = new Date(data?.endDate).getTime();
    return endDate > currentDate ? "active" : "closed";
  };

  const isClosed = status() === "closed";

  return (
    <div className="rounded-xl bg-white p-4 lg:p-6 border border-alice-blue">
      <div className="flex items-start space-x-3 justify-between">
        <div>
          <h3 className="mb-[0.625rem] text-mako text-sm lg:text-base font-medium">
            {data?.title}
          </h3>
          <span className="flex items-end space-x-[0.5625rem]">
            <span className="text-s10 text-mist">by</span>
            <span className="flex items-center text-xs text-mako space-x-[0.375rem]">
              <RAvatar
                src={data?.author?.profilePhoto?.url}
                className="size-4 bg-athens"
              />
              <span>{data?.author?.username}</span>
            </span>
          </span>
        </div>
        <span
          className={cn(
            "flex items-center justify-center space-x-2 text-xs text-apple bg-beige rounded-full py-1 px-[0.875rem]",
            {
              "bg-red-100 text-red-600": isClosed,
            }
          )}
        >
          <span
            className={cn("rounded-full bg-emerald size-2 inline-block", {
              "bg-red-500": isClosed,
            })}
          ></span>
          <span>{isClosed ? "Closed" : "Active"}</span>
        </span>
      </div>
      <p className="mt-5 mb-6 text-xs text-mako whitespace-pre-wrap">
        {data?.description}
      </p>
      <div>
        <h4 className="uppercase text-xs text-shark mb-3 font-bold">
          Vote details
        </h4>
        <div className="rounded-lg bg-haze/[44%] p-4 space-y-3">
          <span className="flex items-center space-x-4">
            <span className="text-xs text-mist">Start Date</span>
            <span className="text-sm text-mako">
              {formatDateToCustomString(data?.startDate)}
            </span>
          </span>
          <span className="flex items-center space-x-4">
            <span className="text-xs text-mist">End Date</span>
            <span className="text-sm text-mako">
              {formatDateToCustomString(data?.endDate)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProposalInfo;
