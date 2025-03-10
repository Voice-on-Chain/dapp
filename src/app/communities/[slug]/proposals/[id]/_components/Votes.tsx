"use client";
import { voteOnProposal } from "@/actions/proposal";
import { VoiceCircleIcon } from "@/components/custom-icons/VoiceIcon";
import VotedCastedPopup from "@/components/shared/VotedCastedPopup";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { VoteProps } from "@/types/proposals";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  id: string;
  options: string[];
  type: string;
  endDate: string;
  proposalConfig?: {
    minimum_voice_power: number;
    minimum_voice_age: number;
  };
  votes: VoteProps[];
}

const Votes = ({
  id,
  options,
  type,
  endDate,
  proposalConfig,
  votes,
}: Props) => {
  const [choice, setChoice] = useState("");
  const [showPopup, setShowPopupState] = useState(false);
  const { user } = useUser();
  const [pending, setPending] = useState(false);

  const voted = !!choice;

  useEffect(() => {
    if (user && votes) {
      const votedFor = votes.find((vote) => vote?.by?._id === user?._id)?.vote;
      if (votedFor) setChoice(votedFor);
    }
  }, [user, votes]);

  const status = () => {
    const currentDate = new Date().getTime();
    const _endDate = new Date(endDate).getTime();
    return _endDate > currentDate ? "active" : "closed";
  };

  const isClosed = status() === "closed";

  const voteHandler = async () => {
    setPending(true);
    const response = await voteOnProposal(id, user?.address!, {
      userId: user?._id,
      vote: choice,
    });

    if (response?.message) {
      toast.error(response?.message, {
        className: "error-message",
      });
      return;
    }

    toast("Successfully voted proposal");
    setPending(false);
    setShowPopupState(true);
  };

  return (
    <>
      <div className="rounded-xl bg-white p-4 lg:p-6 border border-alice-blue">
        <span className="mb-4 flex items-center justify-between w-full space-x-4">
          <h4 className="text-sm text-mako font-medium">VOTES</h4>
          <span className="flex items-center justify-end space-x-2 text-xs lg:text-sm font-medium text-mako">
            <span className="inline-block rounded-full size-[0.375rem] bg-salmon"></span>
            <span className="inline-block capitalize">{type} Voting</span>
          </span>
        </span>
        <RadioGroup
          className="mb-4"
          value={choice}
          onValueChange={(value) => setChoice(value)}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center cursor-pointer border hover:border-accent border-alice-blue rounded-lg py-[0.6875rem] px-[0.875rem] text-sm text-mako",
                {
                  "border-accent": option === choice,
                }
              )}
            >
              <RadioGroupItem
                value={option}
                id={`${option}-${index}`}
                className="opacity-0 scale-0"
              />
              <Label
                htmlFor={`${option}-${index}`}
                className="capitalize font-normal cursor-pointer w-full block"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {isClosed ? null : (
          <button
            disabled={pending || !choice || voted || !user}
            onClick={voteHandler}
            className="mb-4 disabled:cursor-not-allowed text-white bg-accent disabled:opacity-20 font-medium text-sm rounded-lg px-4 py-[0.875rem] w-full"
          >
            {voted ? "Voted" : pending ? "Casting vote..." : "Cast your vote"}
          </button>
        )}
        <span className="px-4 py-[0.625rem] rounded-[0.125rem] space-x-2 flex text-xs lg:text-sm text-mako items-start sm:items-center bg-squeeze">
          <span className="*:size-4">
            <VoiceCircleIcon />
          </span>
          <span>
            A vote costs {proposalConfig?.minimum_voice_power} Voice Power or{" "}
            {proposalConfig?.minimum_voice_age} Voice age.
          </span>
        </span>
      </div>
      <VotedCastedPopup
        buttonText="Back to Proposal"
        isOpen={showPopup}
        closeHandler={() => setShowPopupState(false)}
      />
    </>
  );
};

export default Votes;
