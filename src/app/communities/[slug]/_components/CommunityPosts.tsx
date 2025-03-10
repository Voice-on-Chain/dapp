import EmptyState from "@/components/shared/EmptyState";
import PostCard from "@/components/shared/PostCard";
import { Post } from "@/types/post";
import React from "react";

const CommunityPosts = ({ data }: { data?: Post[] }) => {
  return (
    <div className="w-full bg-white rounded-xl p-3 lg:p-[1.375rem] border border-alice-blue">
      <h3 className="text-sm lg:text-base text-mako font-medium mb-3 lg:mb-[0.9375rem]">
        Posts
      </h3>
      <div className="space-y-[0.9375rem]">
        {data && data?.length > 0 ? (
          data?.map((post, index) => <PostCard key={post?._id} data={post} />)
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default CommunityPosts;
