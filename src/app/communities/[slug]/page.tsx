import DocumentIcon from "@/components/custom-icons/DocumentIcon";
import { HomeIconOutline } from "@/components/custom-icons/HomeIcon";
import PollIcon from "@/components/custom-icons/PollIcon";
import CompleteProfile from "@/components/shared/CompleteProfile";
import RAvatar from "@/components/ui/avatar-compose";
import RBreadcrumb from "@/components/ui/breadcrumb-compose";
import RPopover from "@/components/ui/popover-compose";
import {
  getCommunity,
  getCommunityPosts,
  getCommunityStatistics,
} from "@/services/community";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { LuPlus } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import CommunityCriteria from "./_components/CommunityCriteria";
import CommunityInfo from "./_components/CommunityInfo";
import CommunityPosts from "./_components/CommunityPosts";
import CommunityRewardPool from "./_components/CommunityRewardPool";
import CommunityStats from "./_components/CommunityStats";
import CreatePost from "./_components/CreatePost";
import UserEngagements from "./_components/UserEngagements";

async function page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = params?.slug;

  const [community, statistics, posts] = await Promise.all([
    getCommunity(slug),
    getCommunityStatistics(slug),
    getCommunityPosts(slug),
  ]);

  if (!community?._id) {
    notFound();
  }

  const community_name = community?.name || slug;

  return (
    <>
      <CompleteProfile />
      <header className="mt-4 lg:mt-5 max-w-[62.125rem]">
        <div className="border flex md:items-center space-y-4 md:space-y-0 flex-col md:flex-row justify-between border-white-smoke-4 rounded-lg py-6 px-5 bg-white">
          <RBreadcrumb activePath={community_name} />

          <div className="flex items-center space-x-3">
            <UserEngagements community={community?._id} />
            <RPopover
              trigger={
                <button
                  title="Create"
                  className="border border-accent flex items-center text-xs lg:text-sm font-medium text-mako space-x-2 rounded-lg px-4 py-[0.625rem]"
                >
                  <LuPlus size={18} />
                  <span>Create</span>
                  <MdKeyboardArrowDown size={16} />
                </button>
              }
              contentClassName="border border-athens bg-white space-y-2 rounded-lg py-[0.625rem] px-[0.375rem] max-w-[8.3125rem] drop-shadow-popover"
            >
              <CreatePost communityId={slug} />
              <Link
                href={`/communities/${community?._id}/proposals`}
                className="flex items-center space-x-2 px-2 hover:bg-azure py-[0.375rem] text-xs text-mako"
              >
                <span>
                  <DocumentIcon />
                </span>
                <span>Proposal</span>
              </Link>
              <Link
                href={`/communities/${community?._id}/polls`}
                className="flex items-center space-x-2 px-2 hover:bg-azure py-[0.375rem] text-xs text-mako"
              >
                <span>
                  <PollIcon />
                </span>
                <span>Poll</span>
              </Link>
            </RPopover>
          </div>
        </div>
      </header>
      <section className="max-w-[62.125rem] bg-white-smoke-4 overflow-hidden relative rounded-lg my-[0.875rem] min-h-[11.9375rem]">
        {community?.banner?.url ? (
          <Image
            alt="Banner"
            fill
            src={community?.banner?.url}
            className="object-cover object-top"
          />
        ) : null}
      </section>
      <section className="lg:flex lg:items-start lg:space-x-[0.875rem]">
        <div className="w-full lg:max-w-[41.125rem] space-y-[0.875rem]">
          <CommunityInfo
            name={community?.name || ""}
            description={community?.description || ""}
            logo={community?.logo?.url || ""}
            creator={community?.creator?.address || ""}
          />
          <CommunityStats
            community={community?._id || ""}
            members={statistics?.totalMembers || 0}
            proposals={statistics?.totalProposals || 0}
            polls={statistics?.totalPolls || 0}
          />
          <CommunityPosts data={posts?.posts?.data} />
        </div>
        <div className="w-full lg:max-w-[20.125rem] lg:space-y-[0.875rem] sticky top-4">
          <CommunityCriteria
            members={community?.members || []}
            criterias={community?.criterias || []}
            contract_address={community?.contract_address}
            creator={community?.creator?.address}
            config={{
              post: community?.post || null,
              proposal: community?.proposal || null,
              poll: community?.poll || null,
              comment: community?.comment || null,
            }}
            communityId={community?._id}
            twitter={community?.twitter}
            website={community?.website}
          />
          <CommunityRewardPool amount={community?.token_to_distribute || 0} />
        </div>
      </section>
    </>
  );
}

export default page;
