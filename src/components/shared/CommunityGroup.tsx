import Link from "next/link";
import React from "react";
import CommunityCard from "./CommunityCard";
import { Community } from "@/types/community";

interface Props {
  title: string;
  href: string;
  data: Community[];
}

const CommunityGroup = ({ title, href, data }: Props) => {
  return (
    <div>
      <span className="flex items-center justify-between text-mako mb-18">
        <h3 className="text-lg font-medium lg:text-s20">{title}</h3>
        <Link href={href} className="underline text-sm lg:text-base">
          View all
        </Link>
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-18 gap-x-[0.875rem]">
        {/* Community cards */}
        {data?.map((community) => (
          <CommunityCard key={community?._id} data={community} />
        ))}
      </div>
    </div>
  );
};

export default CommunityGroup;
