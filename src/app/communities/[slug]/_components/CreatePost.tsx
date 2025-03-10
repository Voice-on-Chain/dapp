"use client";
import { createPost } from "@/actions/post";
import BubbleIcon from "@/components/custom-icons/BubbleIcon";
import GalleryAddIcon from "@/components/custom-icons/GalleryAddIcon";
import { VoiceCircleIcon } from "@/components/custom-icons/VoiceIcon";
import Modal from "@/components/ui/modal";
import useCommunity from "@/hooks/use-community";
import { useGeneratePost } from "@/hooks/use-generate";
import useIsMember from "@/hooks/use-is-member";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { toast } from "sonner";

const CreatePost = ({ communityId }: { communityId: string }) => {
  const [creatingPost, setCreatingPostState] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setLoadingState] = useState(false);
  const { community } = useCommunity(communityId);
  const { isMember, address, user } = useIsMember(community);
  const { data, isPending, mutate, isSuccess } = useGeneratePost();

  useEffect(() => {
    if (isSuccess && data?.content) {
      setContent(data?.content ?? "");
    }
  }, [isSuccess, data]);

  async function onSubmit() {
    setLoadingState(true);
    const response = await createPost(address!, {
      content,
      community: communityId,
      author: user?._id,
    });

    if (response?.message) {
      toast.error(response?.message, {
        className: "error-message",
      });
      setLoadingState(false);
      return;
    }

    toast("Successfully created a new post");
    setContent("");
    setLoadingState(false);
    setCreatingPostState(false);
  }

  return (
    <>
      {isMember ? (
        <button
          onClick={() => setCreatingPostState(true)}
          className="w-full flex items-center space-x-2 px-2 hover:bg-azure py-[0.375rem] text-xs text-mako"
        >
          <span>
            <BubbleIcon />
          </span>
          <span>Post</span>
        </button>
      ) : null}
      <Modal
        title="Create a Post"
        isOpen={creatingPost}
        closeHandler={() => setCreatingPostState(false)}
        className="w-[34.375rem]"
      >
        <div className="mt-7">
          <span className="px-4 py-[0.625rem] mb-5 rounded-[0.125rem] space-x-2 flex text-xs lg:text-sm text-mako items-start sm:items-center bg-squeeze">
            <span className="*:size-4">
              <VoiceCircleIcon />
            </span>
            <span>
              Creating a post costs{" "}
              <strong>{community?.post?.minimum_voice_power}</strong> Voice
              Power
            </span>
          </span>
          <div className="mb-7">
            <h5 className="text-xs lg:text-sm text-mako mb-[0.375rem]">
              What do you want to talk about?
            </h5>
            <div className="mb-3 relative h-auto">
              <textarea
                minLength={1}
                maxLength={1000}
                value={content}
                onChange={(event) => {
                  const value = event.target.value;
                  setContent(value);
                }}
                className={cn(
                  "border border-alice-blue min-h-[10rem] placeholder:text-gray placeholder:text-xs text-sm text-mako w-full block resize-none p-[0.875rem] rounded-lg",
                  {
                    "border-scarlet": content.length > 1500,
                  }
                )}
                placeholder="Share your thoughts with the community"
              />
              <span className="absolute bottom-1 text-xs text-right text-gray right-1.5">
                {content.length}/1500
              </span>
            </div>
            {/* <span className="flex items-center w-fit">
              <input
                type="file"
                accept="images/*"
                id="post-image"
                className="w-0 h-0 opacity-0 scale-0"
              />
              <label
                htmlFor="post-image"
                className="flex space-x-2 cursor-pointer items-center text-sm text-mako"
              >
                <GalleryAddIcon />
                <span>Add images</span>
              </label>
            </span> */}
          </div>
          <span className="ml-auto mr-0 flex items-center space-x-3 w-fit">
            {/* <button
              disabled={isLoading || isPending}
              onClick={() => mutate()}
              className="disabled:cursor-not-allowed rounded-md border flex items-center space-x-2 px-4 py-2.5 hover:bg-accent hover:text-white w-fit border-athens text-xs lg:text-sm text-accent"
            >
              <span>
                <RiAiGenerate />
              </span>
              <span>{isPending ? "Generating..." : "Suggest"}</span>
            </button> */}
            <button
              onClick={onSubmit}
              disabled={isLoading || isPending || content.length > 1500}
              className={cn(
                "bg-accent disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 w-fit hover:bg-teal block text-white font-medium text-sm rounded-lg"
              )}
            >
              {isLoading ? "Posting..." : "Post"}
            </button>
          </span>
        </div>
      </Modal>
    </>
  );
};

export default CreatePost;
