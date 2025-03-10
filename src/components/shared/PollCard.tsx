"use client";
import { voteOnPoll } from "@/actions/poll";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useUser from "@/hooks/use-user";
import { cn, timeAgo } from "@/lib/utils";
import { Poll } from "@/types/poll";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { VoiceCircleIcon } from "../custom-icons/VoiceIcon";
import RAvatar from "../ui/avatar-compose";
import VotedCastedPopup from "./VotedCastedPopup";

const PollCard = ({ data }: { data: Poll }) => {
  const [choice, setChoice] = useState("");
  const [showPopup, setShowPopupState] = useState(false);
  const [pending, setPending] = useState(false);
  const { user } = useUser();

  const voted = !!choice;

  useEffect(() => {
    if (user && data) {
      const votedFor = data?.votes.find((vote) => vote?.by === user?._id)?.vote;
      if (votedFor) setChoice(votedFor);
    }
  }, [user, data]);

  const voteHandler = async (vote: string) => {
    setPending(true);
    setShowPopupState(true);

    const response = await voteOnPoll(data?._id, user?.address!, {
      userId: user?._id,
      vote,
    });

    if (response?.message) {
      toast.error(response?.message, {
        className: "error-message",
      });
      return;
    }

    toast("Successfully voted poll");
    setPending(false);
  };

  return (
    <>
      <div className="border bg-white border-alice-blue rounded-lg p-5">
        <div className="flex items-center justify-between mb-18">
          <div className="flex items-center space-x-[0.625rem]">
            <RAvatar
              src={data?.author?.profilePhoto?.url}
              className="size-[2.5rem]"
            />
            <span>
              <h4 className="text-mako font-medium text-sm first-letter:capitalize">
                {data?.author?.username}
              </h4>
              <h5 className="text-xs text-gray">
                {timeAgo(new Date(data?.createdAt))}
              </h5>
            </span>
          </div>
          <div>
            <span
              className={cn(
                "flex items-center justify-center space-x-2 text-xs text-apple bg-beige rounded-full py-1 px-[0.875rem]",
                {
                  "bg-red-100 text-red-600": data?.status === "closed",
                }
              )}
            >
              <span
                className={cn("rounded-full bg-emerald size-2 inline-block", {
                  "bg-red-500": data?.status === "closed",
                })}
              ></span>
              <span className="capitalize">{data?.status}</span>
            </span>
            <span className="flex items-center mt-[0.4375rem] text-s10 space-x-1 text-shark">
              <VoiceCircleIcon />
              <span>
                {data?.community?.poll?.minimum_voice_power} Voice Power
              </span>
            </span>
          </div>
        </div>
        <div>
          <span className="flex items-center justify-between mb-[0.4375rem]">
            <h5 className="text-mako font-medium text-sm first-letter:capitalize">
              {data?.question}
            </h5>
            <span className="text-s10 text-mist">choose one</span>
          </span>

          <RadioGroup
            value={choice}
            onValueChange={(value) => {
              setChoice(value);
              voteHandler(value); // Open popup after selecting a choice
            }}
            disabled={!!choice || voted || !user || data?.status === "closed"}
          >
            {data?.options?.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center space-x-2 cursor-pointer border hover:border-accent border-alice-blue rounded-lg py-[0.6875rem] px-[0.875rem] text-sm text-mako",
                  {
                    "border-accent": option === choice,
                  }
                )}
              >
                <RadioGroupItem
                  disabled={
                    !!choice || voted || !user || data?.status === "closed"
                  }
                  value={option}
                  id={index.toString()}
                  className={cn({
                    "border-blue-chill": choice === option,
                  })}
                />
                <Label
                  htmlFor={index.toString()}
                  className="capitalize font-normal w-full block"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="mt-18 flex items-center justify-between">
          {/* <span className="flex items-center space-x-[0.375rem] text-xs text-mako">
          <span>Poll created</span>
            <span className="text-sm font-medium">   {timeAgo(new Date(data?.createdAt))}</span>
          </span> */}
          <Link
            href={`/communities/${data?.community?._id}/polls/${data?._id}`}
            className="underline text-xs text-mako"
          >
            View votes
          </Link>
        </div>
      </div>
      <VotedCastedPopup
        content={pending ? "Casting your vote..." : ""}
        buttonText="Back to Poll"
        isOpen={showPopup}
        closeHandler={() => setShowPopupState(false)}
      />
    </>
  );
};

export default PollCard;
