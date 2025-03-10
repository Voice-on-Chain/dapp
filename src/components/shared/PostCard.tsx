"use client";
import { applaudPost, commentOnPost } from "@/actions/post";
import useUser from "@/hooks/use-user";
import { cn, timeAgo } from "@/lib/utils";
import { Post } from "@/types/post";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { ClapIcon, ClapOutlineIcon } from "../custom-icons/ClapIcon";
import InfoIcon from "../custom-icons/InfoIcon";
import MessageIcon from "../custom-icons/MessageIcon";
import { VoiceOutlineIcon } from "../custom-icons/VoiceIcon";
import RAvatar from "../ui/avatar-compose";

const PostCard = ({ data }: { data: Post }) => {
  const { isConnected } = useAccount();
  const { user } = useUser();
  const [pending, setPending] = useState(false);
  const [applauded, setApplauded] = useState(false);
  const [applauds, setApplauds] = useState(data?.applauds?.length || 0);

  const [commenting, setCommenting] = useState(false);

  //comment
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (user) {
      if (data?.applauds?.includes(user?._id)) {
        setApplauded(true);
      }
    }
  }, [user, data]);

  const applaudHandler = async () => {
    if (!isConnected) {
      toast.error("Please connect wallet", {
        className: "error-message",
      });
      return;
    }

    setPending(true);

    const response = await applaudPost(data?._id, user?.address!, {
      userId: user?._id,
    });

    if (response?.message) {
      toast.error(response?.message, {
        className: "error-message",
      });
      return;
    }

    toast("Successfully applauded post");
    setPending(false);
    setApplauded(true);
    setApplauds((prev) => prev + 1);
  };

  const commentHandler = async () => {
    if (!isConnected) {
      toast.error("Please connect wallet", {
        className: "error-message",
      });
      return;
    }

    setCommenting(true);
    const response = await commentOnPost(data?._id, user?.address!, {
      author: user?._id,
      community: data?.community?._id,
      content: comment,
      parentId: data?._id,
    });

    if (response?.message) {
      toast.error(response?.message, {
        className: "error-message",
      });
      return;
    }

    setCommenting(false);
  };

  return (
    <div className="bg-white border rounded-xl border-alice-blue p-4">
      <div className="flex items-center justify-between mb-18">
        <div className="flex items-center space-x-[0.5625rem]">
          <RAvatar
            src={data?.author?.profilePhoto?.url}
            className="size-[2.5rem]"
          />
          <div>
            <span className="flex items-center space-x-1">
              <span className="font-medium text-mako text-sm first-letter:capitalize">
                {data?.author?.username}
              </span>
              <span className="text-s10 bg-old-lace text-golden-rod px-[0.625rem] py-0.5 rounded-3xl">
                Posts
              </span>
            </span>
            <span className="text-xs text-gray">
              {timeAgo(new Date(data?.createdAt))}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-18">
          <Link
            href={`/communities/${data?.community?._id}`}
            className="text-xs text-mako border border-athens rounded-3xl p-[0.3125rem] pr-[0.625rem] flex items-center space-x-[0.375rem]"
          >
            <RAvatar
              src={data?.community?.logo?.url}
              className="size-[1.375rem]"
            />

            <span className="inline-block capitalize">
              {data?.community?.name}
            </span>
          </Link>
          {/* <MdMoreHoriz size={16} /> */}
        </div>
      </div>
      <Link href={`/posts/${data?._id}`} className="block mb-[0.9375rem]">
        <p className="text-sm text-mako whitespace-pre-wrap">{data?.content}</p>
      </Link>
      <div className="bg-white-smoke-5/[58%] mb-[0.625rem] flex items-center space-x-[0.875rem] px-2 py-0.5 rounded-lg">
        <span className="flex items-center py-[0.46875rem] space-x-1 text-xs text-mako">
          <ClapIcon />
          <span>{applauds}</span>
        </span>
        <span className="flex items-center py-[0.46875rem] space-x-1 text-xs text-mako">
          <VoiceOutlineIcon className="text-sun-glow" />
          <span>{data?.lentVoices?.length}</span>
        </span>
        <span className="flex items-center py-[0.46875rem] space-x-1 text-xs text-mako">
          <MessageIcon />
          <span>{data?.comments || 0}</span>
        </span>
        {/* <div className="flex items-center py-[0.46875rem] space-x-1 text-xs text-mako">
            <span className="flex flex-row-reverse items-center -space-x-1">
              <RAvatar className="-ml-1" />
              <RAvatar />
              <RAvatar />
            </span>
            <span>Seen by {formatLargeNumber(data?.seenBy?.length)}</span>
          </div> */}
      </div>

      <div className="border-t border-gallery/[68%] pt-[0.625rem] flex items-center flex-wrap gap-2">
        <div className="flex items-center rounded-3xl min-w-[14.6875rem] py-[0.21875rem] px-[0.3125rem] space-x-[0.375rem] text-sm text-mako border border-athens">
          <RAvatar src={user?.profilePhoto?.url} className="size-[1.375rem]" />
          <div className="relative w-full">
            <input
              disabled={commenting}
              value={comment}
              onChange={(event) => {
                const value = event.target.value;
                setComment(value);
              }}
              placeholder="Add a comment..."
              className="text-xs text-mako h-full outline-none w-full"
            />
            <button
              disabled={!comment || commenting || !user}
              onClick={commentHandler}
              className={cn(
                "absolute right-0 grid disabled:opacity-50 disabled:cursor-not-allowed place-items-center transition-transform duration-75 top-1/2 -translate-y-1/2 rounded-full size-6 bg-accent text-white",
                {
                  "scale-0": !comment,
                }
              )}
            >
              {commenting ? (
                <span className="border-2 rounded-full block border-white border-r-transparent animate-spin size-3"></span>
              ) : (
                <IoIosSend size={16} />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={applaudHandler}
          disabled={pending || applauded || !user}
          className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center rounded-3xl py-[0.3125rem] pr-4 pl-2 space-x-[0.375rem] text-xs text-mako border border-athens"
        >
          <ClapOutlineIcon />
          <span>
            {pending ? "Applauding..." : applauded ? "Applauded" : "Applaud"}
          </span>
        </button>
        <button
          disabled
          className="flex disabled:cursor-not-allowed items-center rounded-3xl py-[0.3125rem] pr-4 pl-2 space-x-[0.375rem] text-xs text-mako border border-athens"
        >
          <VoiceOutlineIcon />
          <span>Lend voice</span>
        </button>
      </div>
      <span className="flex items-center space-x-0.5 mt-2 text-s10 text-mako">
        <InfoIcon />
        <span>
          Comment limited to only {data?.community?.post?.minimum_voice_power}{" "}
          voice power holders
        </span>
      </span>
    </div>
  );
};

export default PostCard;
