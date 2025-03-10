"use client";
import { joinCommunity, leaveCommunity } from "@/actions/user";
import RAvatar from "@/components/ui/avatar-compose";
import Modal from "@/components/ui/modal";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { ConfigProps } from "@/types/community";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

import WalletConnectButton from "@/components/shared/WalletConnectButton";

interface Props {
  community: string;
  members: string[];
  creator: string;
  disableJoin: boolean;
  config: ConfigProps | null;
}

const JoinOrLeaveCommunity = ({
  members,
  creator,
  disableJoin,
  community,
  config,
}: Props) => {
  const { isLoading, user } = useUser();
  const member = isLoading
    ? false
    : members?.find((member) => member === user?._id);
  const [joined, setJoined] = useState(false);
  const [pending, setPending] = useState(false);
  const [noVoicePowerState, setNoVoicePowerState] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (member) {
      setJoined(true);
    }
  }, [member]);

  const joinCommunityHandler = async () => {
    // if (noVoicePower) {
    //   setNoVoicePowerState(true);
    // }

    setPending(true);

    const response = await joinCommunity(address!, community);

    if (response?.error) {
      toast.error(response?.error, {
        className: "error-message",
      });
      setPending(false);
      return;
    }

    toast("Successfully joined community");
    setPending(false);
    setJoined(true);
  };

  const leaveCommunityHandler = async () => {
    setPending(true);

    const response = await leaveCommunity(address!, community);

    if (response?.error) {
      toast.error(response?.error, {
        className: "error-message",
      });
      setPending(false);
      return;
    }

    toast("Successfully left community");
    setPending(false);
    setJoined(false);
  };

  return (
    <>
      {creator === address ? null : isConnected ? (
        <button
          disabled={disableJoin || pending}
          onClick={() => {
            if (joined) {
              //leave
              leaveCommunityHandler();
              return;
            }
            joinCommunityHandler();
          }}
          className={cn(
            "bg-accent px-4 py-2.5 w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal block text-white font-medium text-sm rounded-lg",
            {
              "bg-dove-gray": joined,
              "opacity-0": isLoading,
            }
          )}
        >
          {joined
            ? pending
              ? "Leaving..."
              : "Leave Community"
            : pending
            ? "Joining..."
            : "Join Community"}
        </button>
      ) : (
        <WalletConnectButton />
      )}
      <Modal
        isOpen={noVoicePowerState}
        closeHandler={() => setNoVoicePowerState(false)}
      >
        <div className="mt-[0.3125rem]">
          <span className="flex text-center mb-7 items-center justify-center flex-col">
            <span className="flex items-center -space-x-3 mb-[0.875rem]">
              <RAvatar className="size-8 lg:size-[3.25rem]" />
              <RAvatar
                className="size-8 lg:size-[3.25rem]"
                src="/images/logo-dark.png"
              />
            </span>
            <h4 className="text-lg lg:text-s20 font-medium text-mirage mb-[0.375rem]">
              No Voice Power
            </h4>
            <p className="text-xs text-tundora lg:text-sm">
              You do not have voice token for this project.
            </p>
          </span>
          <div>
            {config ? (
              <>
                <h5 className="font-medium text-xs lg:text-sm text-mirage mb-[0.5625rem]">
                  Why you need a voice token
                </h5>
                <ul className="p-4 rounded-2xl mb-7 bg-alabaster space-y-[0.875rem]">
                  <li className="text-sm text-tundora flex items-start space-x-2">
                    <span className="bg-mako rounded-full inline-block min-w-4 lg:min-w-6 size-4 lg:size-6"></span>
                    <p>
                      Creating a post costs{" "}
                      <strong>{config?.post?.minimum_voice_power}</strong> Voice
                      Power or{" "}
                      <strong>{config?.post?.minimum_voice_age}</strong> voice
                      age
                    </p>
                  </li>
                  <li className="text-sm text-tundora flex items-start space-x-2">
                    <span className="bg-mako rounded-full inline-block min-w-4 lg:min-w-6 size-4 lg:size-6"></span>
                    <p>
                      Creating a comment costs{" "}
                      <strong>{config?.comment?.minimum_voice_power}</strong>{" "}
                      Voice Power or{" "}
                      <strong>{config?.comment?.minimum_voice_age}</strong>{" "}
                      voice age
                    </p>
                  </li>
                  <li className="text-sm text-tundora flex items-start space-x-2">
                    <span className="bg-mako rounded-full inline-block min-w-4 lg:min-w-6 size-4 lg:size-6"></span>
                    <p>
                      Creating a proposal costs{" "}
                      <strong>{config?.proposal?.minimum_voice_power}</strong>{" "}
                      Voice Power or{" "}
                      <strong>{config?.proposal?.minimum_voice_age}</strong>{" "}
                      voice age
                    </p>
                  </li>
                  <li className="text-sm text-tundora flex items-start space-x-2">
                    <span className="bg-mako rounded-full inline-block min-w-4 lg:min-w-6 size-4 lg:size-6"></span>
                    <p>
                      Creating a poll costs{" "}
                      <strong>{config?.poll?.minimum_voice_power}</strong> Voice
                      Power or{" "}
                      <strong>{config?.poll?.minimum_voice_age}</strong> voice
                      age
                    </p>
                  </li>
                </ul>
              </>
            ) : null}
            <Link
              href={`/communities/${community}/swap`}
              className={cn(
                "bg-accent px-4 py-2.5 w-full text-center hover:bg-teal block text-white font-medium text-sm rounded-lg"
              )}
            >
              Get voice token
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default JoinOrLeaveCommunity;
