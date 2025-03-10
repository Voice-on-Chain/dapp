"use client";
import { applaudComment, applaudReply, replyComment } from "@/actions/comment";
import { ClapIcon } from "@/components/custom-icons/ClapIcon";
import MessageIcon from "@/components/custom-icons/MessageIcon";
import { VoiceOutlineIcon } from "@/components/custom-icons/VoiceIcon";
import RAvatar from "@/components/ui/avatar-compose";
import useUser from "@/hooks/use-user";
import { cn, timeAgo } from "@/lib/utils";
import { CommentProps, ReplyProps } from "@/types/comment";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const ReplyCard = ({ data }: { data: ReplyProps }) => {
  const { isConnected } = useAccount();
  const { user } = useUser();
  const [pending, setPending] = useState(false);

  const applaudHandler = async () => {
    if (!isConnected) {
      toast.error("Please connect wallet", {
        className: "error-message",
      });
      return;
    }

    setPending(true);
    const response = await applaudReply(data?._id, user?.address!, {
      userId: user?._id,
    });

    if (response?.message) {
      toast.error(response?.message, {
        className: "error-message",
      });
      return;
    }

    toast("Successfully applauded reply");
    setPending(false);
  };

  return (
    <div className="border-l relative isolate overflow-hidden border-b last-of-type:border-b-0 rounded-bl-xl pb-8 border-[#E0E0E1] p-4">
      <span className="block w-full absolute -z-10 h-4 bg-[#FDFDFD] top-6"></span>
      <div className="block">
        <div className="flex items-center space-x-[0.5625rem] mb-[0.625rem]">
          <RAvatar
            src={data?.author?.profilePhoto?.url}
            className="size-[1.625rem]"
          />
          <div>
            <span className="font-medium block text-mako text-sm first-letter:capitalize">
              {data?.author?.username}
            </span>
            <span className="text-xs block text-gray">
              {timeAgo(new Date(data?.createdAt))}
            </span>
          </div>
        </div>

        <div className="mb-[0.9375rem]">
          <p className="text-sm text-mako whitespace-pre-wrap">
            {data?.content}
          </p>
        </div>

        <div className="bg-white-smoke-5/[58%] flex items-center space-x-[0.875rem] px-2 py-0.5 rounded-lg">
          <button
            onClick={applaudHandler}
            disabled={pending}
            className="disabled:cursor-not-allowed flex items-center py-[0.46875rem] space-x-1 text-xs text-mako"
          >
            <ClapIcon />
            {pending ? (
              <span className="border-2 rounded-full block border-accent border-r-transparent animate-spin size-3"></span>
            ) : (
              <span>{data?.applauds?.length}</span>
            )}
          </button>
          <button
            disabled
            className="disabled:cursor-not-allowed flex items-center py-[0.46875rem] space-x-1 text-xs text-mako"
          >
            <VoiceOutlineIcon className="text-sun-glow" />
            <span>{data?.lentVoices?.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentCard = ({ data }: { data: CommentProps }) => {
  const { isConnected } = useAccount();
  const { user } = useUser();
  const [pending, setPending] = useState(false);
  const [replying, setReplying] = useState(false);
  const [showReplyInput, replyInputState] = useState(false);

  const [reply, setReply] = useState("");

  const applaudHandler = async () => {
    if (!isConnected) {
      toast.error("Please connect wallet", {
        className: "error-message",
      });
      return;
    }

    setPending(true);
    const response = await applaudComment(data?._id, user?.address!, {
      userId: user?._id,
    });

    if (response?.message) {
      toast.error(response?.message, {
        className: "error-message",
      });
      return;
    }

    toast("Successfully applauded comment");
    setPending(false);
  };

  const replyHandler = async () => {
    if (!isConnected) {
      toast.error("Please connect wallet", {
        className: "error-message",
      });
      return;
    }

    setReplying(true);
    const response = await replyComment(user?.address!, {
      author: user?._id,
      community: data?.community,
      content: reply,
      comment: data?._id,
    });

    if (response?.message) {
      toast.error(response?.message, {
        className: "error-message",
      });
      return;
    }

    toast("Successfully replied to comment");
    setReplying(false);
    setReply("");
  };
  return (
    <div className="border-l relative isolate overflow-hidden border-b last-of-type:border-b-0 rounded-bl-xl pb-8 border-[#E0E0E1] p-4">
      <span className="block w-full absolute -z-10 h-4 bg-[#FDFDFD] top-6"></span>
      <div className="flex items-start space-x-2">
        <RAvatar
          src={data?.author?.profilePhoto?.url}
          className="size-[1.625rem]"
        />
        <div className="w-full">
          <div className="flex items-center space-x-[0.5625rem] mb-[0.625rem]">
            <div>
              <span className="font-medium block text-mako text-sm first-letter:capitalize">
                {data?.author?.username}
              </span>
              <span className="text-xs block text-gray">
                {timeAgo(new Date(data?.createdAt))}
              </span>
            </div>
          </div>

          <div className="mb-[0.9375rem]">
            <p className="text-sm text-mako whitespace-pre-wrap">
              {data?.content}
            </p>
          </div>

          <div className="bg-white-smoke-5/[58%] flex items-center space-x-[0.875rem] px-2 py-0.5 rounded-lg">
            <button
              onClick={applaudHandler}
              disabled={pending}
              className="disabled:cursor-not-allowed flex items-center py-[0.46875rem] space-x-1 text-xs text-mako"
            >
              <ClapIcon />
              {pending ? (
                <span className="border-2 rounded-full block border-accent border-r-transparent animate-spin size-3"></span>
              ) : (
                <span>{data?.applauds?.length}</span>
              )}
            </button>
            <button
              disabled
              className="disabled:cursor-not-allowed flex items-center py-[0.46875rem] space-x-1 text-xs text-mako"
            >
              <VoiceOutlineIcon className="text-sun-glow" />
              <span>{data?.lentVoices?.length}</span>
            </button>
            <button
              onClick={() => replyInputState(!showReplyInput)}
              className="flex items-center py-[0.46875rem] space-x-1 text-xs text-mako"
            >
              <MessageIcon />
              <span>{data?.replies?.length || 0}</span>
            </button>
          </div>

          {/* reply input field */}
          <div
            className={cn("relative overflow-hidden h-auto mt-[0.9375rem]", {
              "scale-0 mt-0 h-0": !showReplyInput,
            })}
          >
            <textarea
              minLength={1}
              maxLength={1000}
              value={reply}
              onChange={(event) => {
                const value = event.target.value;
                setReply(value);
              }}
              className="border bg-transparent border-alice-blue min-h-[5.0625rem] placeholder:text-gray placeholder:text-xs text-sm text-mako w-full block resize-none p-[0.875rem] rounded-lg"
              placeholder="Share your thoughts on this comment"
            />
            <span className="absolute bottom-2 text-xs font-medium flex items-center space-x-3 lg:space-x-[0.875rem] right-2">
              <button
                onClick={() => replyInputState(false)}
                disabled={replying}
                className="text-mako disabled:cursor-not-allowed bg-white-smoke-4 py-[0.375rem] px-[0.625rem] rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={replyHandler}
                disabled={replying || !reply}
                className="disabled:cursor-not-allowed disabled:opacity-50 text-white bg-accent py-[0.375rem] px-[0.625rem] rounded-lg"
              >
                {replying ? "Replying..." : "Reply"}
              </button>
            </span>
          </div>
          <div className="-space-y-8">
            {data?.replies?.map((reply) => (
              <ReplyCard key={reply?._id} data={reply} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Comments = ({ data }: { data: CommentProps[] }) => {
  return (
    <div className="-space-y-8">
      {data?.map((comment) => (
        <CommentCard key={comment?._id} data={comment} />
      ))}
    </div>
  );
};

export default Comments;
