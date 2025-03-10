"use client";
import CopyIcon from "@/components/custom-icons/CopyIcon";
import ShareIcon from "@/components/custom-icons/ShareIcon";
import RAvatar from "@/components/ui/avatar-compose";
import { cn, shortenAddress } from "@/lib/utils";
import React, { useState } from "react";
import { toast } from "sonner";

interface CommunityInfoProps {
  name: string;
  description: string;
  logo: string;
  creator: string;
}

const CommunityInfo = ({
  description,
  name,
  logo,
  creator,
}: CommunityInfoProps) => {
  const [show, setShowState] = useState(false);

  const shareHandler = async () => {
    if (!navigator.canShare) {
      return;
    }

    const shareData = {
      title: name,
      url: `${window.location.href}`,
    };

    if (!navigator.canShare(shareData)) {
      return;
    }

    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const copyHandler = (value: string) => {
    navigator.clipboard.writeText(value);
    toast("Address Copied.");
  };

  const showMoreHandler = () => {
    // Implement show more functionality here
    setShowState(!show);
  };

  return (
    <div className="w-full bg-white rounded-xl p-3 lg:p-[1.375rem] border border-alice-blue">
      <div className="flex items-start justify-between mb-[0.9375rem]">
        <div className="flex items-center space-x-[0.5625rem]">
          <RAvatar
            src={logo}
            className="size-[2.5rem] inline-block bg-athens"
          />
          <div>
            <h4 className="font-medium text-mako text-sm capitalize">{name}</h4>
            <span className="flex items-center text-xs text-gray space-x-1">
              <span>Created by</span>
              <button
                onClick={() => copyHandler(creator)}
                className="flex items-center space-x-1"
              >
                <span className="text-mako font-medium">
                  {shortenAddress(creator)}
                </span>
                <CopyIcon />
              </button>
            </span>
          </div>
        </div>
        <button
          onClick={shareHandler}
          className="flex items-center justify-center p-2 border border-alice-blue rounded-lg"
        >
          <ShareIcon />
        </button>
      </div>
      <div className="text-xs text-mako">
        <p
          className={cn("block whitespace-pre-wrap line-clamp-3 break-words", {
            "line-clamp-none": show,
          })}
        >
          {description}
        </p>
        <button
          onClick={showMoreHandler}
          className={cn("underline block mt-1")}
        >
          {show ? "show less" : "see more"}
        </button>
      </div>
    </div>
  );
};

export default CommunityInfo;
