import RAvatar from "@/components/ui/avatar-compose";
import { cn, formatDateToCustomString } from "@/lib/utils";
import { Poll } from "@/types/poll";
import React from "react";

const PollInfo = ({ data }: { data: Poll }) => {
  const isClosed = data?.status === "closed";

  return (
    <div className="rounded-xl bg-white p-4 lg:p-6 border border-alice-blue">
      <div className="mb-4 flex items-start space-x-3 justify-between">
        <div>
          <h3 className="mb-[0.625rem] text-mako text-sm lg:text-base font-medium">
            {data?.question}
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
      <div>
        <h4 className="uppercase text-xs text-shark mb-3 font-bold">
          Vote details
        </h4>
        <div className="rounded-lg bg-haze/[44%] p-4 space-y-3">
          <span className="flex items-center space-x-4">
            <span className="text-xs text-mist">Date</span>
            <span className="text-sm text-mako">
              {formatDateToCustomString(data?.createdAt)}
            </span>
          </span>
          {/* <span className="flex items-center space-x-4">
            <span className="text-xs text-mist">End Date</span>
            <span className="text-sm text-mako">
              Tue, Sept 20th 2024 . 10:00AM UTC+1
            </span>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default PollInfo;
