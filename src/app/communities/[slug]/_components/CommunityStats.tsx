import DocumentIcon from "@/components/custom-icons/DocumentIcon";
import PollIcon from "@/components/custom-icons/PollIcon";
import UsersIcon from "@/components/custom-icons/UsersIcon";
import { formatLargeNumber } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

interface CardProps {
  href: string;
  title: string;
  value: string;
  Icon?: React.ReactNode;
}

const Card = ({ href, title, value, Icon }: CardProps) => {
  return (
    <Link
      href={href}
      className="w-full bg-white hover:bg-azure rounded-lg text-mako p-3 lg:p-[0.875rem] border border-alice-blue flex items-start justify-between"
    >
      <div className="flex items-start space-x-[0.625rem]">
        <span className="size-8 inline-flex items-center justify-center text-cadet rounded-full bg-azure-3">
          {Icon}
        </span>
        <span>
          <h4 className="text-gray text-xs">{title}</h4>
          <h5 className="text-base lg:text-lg font-medium">{value}</h5>
        </span>
      </div>
      <MdKeyboardArrowRight size={16} />
    </Link>
  );
};

interface CommunityStatsProps {
  community: string;
  members: number;
  proposals: number;
  polls: number;
}

const CommunityStats = ({
  community,
  members,
  proposals,
  polls,
}: CommunityStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card
        href={`/communities/${community}/members`}
        title="Members"
        value={formatLargeNumber(members)}
        Icon={<UsersIcon />}
      />
      <Card
        href={`/communities/${community}/proposals`}
        title="Proposals"
        value={formatLargeNumber(proposals)}
        Icon={<DocumentIcon />}
      />
      <Card
        href={`/communities/${community}/polls`}
        title="Polls"
        value={formatLargeNumber(polls)}
        Icon={<PollIcon />}
      />
    </div>
  );
};

export default CommunityStats;
