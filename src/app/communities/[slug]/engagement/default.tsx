"use client";
import { HomeIconOutline } from "@/components/custom-icons/HomeIcon";
import PollCard from "@/components/shared/PollCard";
import PostCard from "@/components/shared/PostCard";
import ProposalCard from "@/components/shared/ProposalCard";
import Tabs from "@/components/shared/Tabs";
import RBreadcrumb from "@/components/ui/breadcrumb-compose";
import RPopover from "@/components/ui/popover-compose";
import useUserEngagements from "@/hooks/use-engagements";
import useUser from "@/hooks/use-user";
import Link from "next/link";

import React, { Suspense, useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import CreatePost from "../_components/CreatePost";

function Default({ community, type }: { community: string; type: string }) {
  const { user, isLoading } = useUser();
  const { isLoading: pending, engagements } = useUserEngagements(
    user?.address,
    community,
    user?._id
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    if (engagements) {
      if (type === "posts") {
        setData(engagements?.data?.filter((d: any) => d?.type === "post"));
        return;
      }
      if (type === "proposals") {
        setData(engagements?.data?.filter((d: any) => d?.type === "proposal"));
        return;
      }
      if (type === "polls") {
        setData(engagements?.data?.filter((d: any) => d?.type === "poll"));
        return;
      }
      setData(engagements?.data || []);
    }
  }, [engagements, type]);

  if (isLoading || pending) {
    return (
      <div className="border flex items-center justify-center mt-4 lg:mt-5 max-w-[62.125rem] bg-white border-white-smoke-4 rounded-lg py-6 px-5">
        <span className="border-2 border-accent rounded-full size-4 lg:size-8 border-r-transparent animate-spin block"></span>
      </div>
    );
  }

  return (
    <>
      <header className="border mt-4 lg:mt-5 mb-18 max-w-[62.125rem] bg-white border-white-smoke-4 rounded-lg py-6 px-5">
        <div className="flex items-center justify-between">
          <RBreadcrumb
            prevPaths={[
              {
                href: `/communities/${community}`,
                label: engagements?.community?.name,
              },
            ]}
            activePath="My Engagement"
          />
          <RPopover
            trigger={
              <button
                title="Create"
                className="bg-azure-2 flex items-center text-xs lg:text-sm font-medium text-mako space-x-2 rounded-lg px-4 py-[0.625rem]"
              >
                <LuPlus size={18} />
                <span>Create</span>
                <MdKeyboardArrowDown size={16} />
              </button>
            }
            contentClassName="border border-athens bg-white space-y-2 rounded-lg py-[0.625rem] px-[0.375rem] max-w-[8.3125rem] drop-shadow-popover"
          >
            {/* <button className="w-full flex items-center space-x-2 px-2 hover:bg-azure py-[0.375rem] text-xs text-mako">
              <span>
                <HomeIconOutline />
              </span>
              <span>Post</span>
            </button> */}
            <CreatePost communityId={community} />
            <Link
              href={`/communities/${community}/proposals`}
              className="flex items-center space-x-2 px-2 hover:bg-azure py-[0.375rem] text-xs text-mako"
            >
              <span>
                <HomeIconOutline />
              </span>
              <span>Proposal</span>
            </Link>
            <Link
              href={`/communities/${community}/polls`}
              className="flex items-center space-x-2 px-2 hover:bg-azure py-[0.375rem] text-xs text-mako"
            >
              <span>
                <HomeIconOutline />
              </span>
              <span>Poll</span>
            </Link>
          </RPopover>
        </div>
        <div className=" border-alice-blue border-t pt-18 mt-18">
          <Suspense>
            <Tabs
              paramKey="type"
              active={type}
              routes={["posts", "proposals", "polls"]}
            />
          </Suspense>
        </div>
      </header>
      <section className="max-w-[62.125rem]">
        <div className="space-y-3 max-w-[43.625rem]">
          {data?.map((item: any, index: number) => {
            if (item?.type === "post") {
              return <PostCard key={index} data={item?.data} />;
            }
            if (item?.type === "poll") {
              return <PollCard key={index} data={item?.data} />;
            }

            if (item?.type === "proposal") {
              return <ProposalCard key={index} data={item?.data} />;
            }
            return <></>;
          })}
        </div>
      </section>
    </>
  );
}

export default Default;
