"use client";
import ChartIcon from "@/components/custom-icons/ChartIcon";
import useUser from "@/hooks/use-user";
import Link from "next/link";
import React from "react";

interface Props {
  community: string;
}

const UserEngagements = ({ community }: Props) => {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <Link
          href={`/communities/${community}/engagement`}
          title="My Engagement"
          className="flex items-center space-x-2 border text-xs lg:text-sm font-medium border-gainsboro-2 text-mako rounded-lg px-4 py-[0.625rem]"
        >
          <ChartIcon />
          <span>My Engagement</span>
        </Link>
      ) : null}
    </>
  );
};

export default UserEngagements;
