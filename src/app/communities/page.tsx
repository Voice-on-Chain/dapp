import CommunityGroup from "@/components/shared/CommunityGroup";
import EmptyState from "@/components/shared/EmptyState";
import {
  getAllCommunities,
  getNewCommunities,
  getPopularCommunities,
} from "@/services/community";
import Link from "next/link";
import React from "react";
import { BiSolidInfoCircle } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";

async function page() {
  const [popularCommunities, newCommunities, allCommunities] =
    await Promise.all([
      getPopularCommunities(),
      getNewCommunities(),
      getAllCommunities(),
    ]);

  return (
    <>
      <header className="mt-4 lg:mt-5 max-w-[62.125rem]">
        <div className="mb-18 flex items-start lg:items-center space-x-3 border border-sun-glow bg-serenade rounded-lg py-4 px-5 text-xs lg:text-sm text-gamboge">
          <BiSolidInfoCircle size={24} />
          <p>
            All communities currently listed, are for testnet purposes and
            doesn’t have association with the team.
          </p>
        </div>
        <div className="border flex items-center justify-between border-white-smoke-4 rounded-lg py-6 px-5 bg-white">
          <h1 className="text-mako text-lg lg:text-2xl font-medium">
            Communities
          </h1>
          <Link
            href="/communities/new"
            title="Create community"
            className="flex items-center text-xs lg:text-sm font-medium text-mako space-x-2 border border-dark-gray rounded-lg px-4 py-[0.625rem]"
          >
            <LuPlus size={18} />
            <span>Create community</span>
          </Link>
        </div>
      </header>
      <section className="max-w-[62.125rem] mt-6 space-y-[2.75rem]">
        {popularCommunities?.data?.length > 0 ? (
          <CommunityGroup
            title="Popular Communities"
            href="/communities/categories/popular"
            data={popularCommunities?.data}
          />
        ) : null}
        {newCommunities?.data?.length > 0 ? (
          <CommunityGroup
            title="New Communities"
            href="/communities/categories/new"
            data={newCommunities?.data}
          />
        ) : null}
        {allCommunities?.data?.length > 0 ? (
          <CommunityGroup
            title="All Communities"
            href="/communities/categories/all"
            data={allCommunities?.data}
          />
        ) : null}
        {popularCommunities?.data?.length === 0 &&
        newCommunities?.data?.length === 0 &&
        allCommunities?.data?.length === 0 ? (
          <EmptyState />
        ) : null}
      </section>
    </>
  );
}

export default page;
