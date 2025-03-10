"use client";
import EmptyState from "@/components/shared/EmptyState";
import PollCard from "@/components/shared/PollCard";
import PostCard from "@/components/shared/PostCard";
import ProposalCard from "@/components/shared/ProposalCard";
import useFeed from "@/hooks/use-feed";
import React from "react";

const Feeds = ({ data }: { data: any }) => {
  const { isLoading, isFetching, data: feed } = useFeed(data);

  return (
    <>
      {isLoading || isFetching ? (
        <div className="border flex items-center max-w-[43.625rem] justify-center mt-4 mb-4 lg:mt-5 bg-white border-white-smoke-4 rounded-lg py-6 px-5">
          <span className="border-2 border-accent rounded-full size-4 lg:size-8 border-r-transparent animate-spin block"></span>
        </div>
      ) : null}
      {feed?.length > 0 ? (
        <div className="space-y-3 max-w-[43.625rem]">
          {typeof feed === "object" &&
            feed?.map((feed: any, index: number) => {
              if (feed?.type === "post") {
                return <PostCard key={index} data={feed?.data} />;
              }
              if (feed?.type === "poll") {
                return <PollCard key={index} data={feed?.data} />;
              }

              if (feed?.type === "proposal") {
                return <ProposalCard key={index} data={feed?.data} />;
              }
              return <></>;
            })}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default Feeds;
