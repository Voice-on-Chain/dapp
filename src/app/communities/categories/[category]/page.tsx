import CommunityCard from "@/components/shared/CommunityCard";
import GoBack from "@/components/shared/GoBack";
import Pagination from "@/components/shared/Pagination";
import { getAllCommunities } from "@/services/community";
import { Root } from "@/types/community";
import Link from "next/link";
import React, { Suspense } from "react";
import { BiSolidInfoCircle } from "react-icons/bi";
import { LuPlus } from "react-icons/lu";

async function page({
  params,
  searchParams,
}: {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
  };
}) {
  const category = params?.category;
  const page = searchParams?.page;
  const communities: Root | null =
    category === "all" ? await getAllCommunities(Number(page || 1), 100) : null;

  return (
    <>
      <header className="mt-4 lg:mt-5 max-w-[62.125rem]">
        <div className="mb-18 flex items-start lg:items-center space-x-3 border border-sun-glow bg-serenade rounded-lg py-4 px-5 text-xs lg:text-sm text-gamboge">
          <BiSolidInfoCircle size={24} />
          <p>
            All communities currently listed, are for testnet purposes and
            doesn’t have association with the protocol team
          </p>
        </div>
        <div className="border flex items-center justify-between border-white-smoke-4 rounded-lg py-6 px-5 bg-white">
          <span className="flex items-center space-x-2 lg:space-x-4">
            <GoBack />
            <h1 className="font-medium capitalize text-sm text-mako md:text-base lg:text-lg">
              {category} Communities
            </h1>
          </span>
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
      <section className="max-w-[62.125rem] mt-6 space-y-6 lg:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-18 gap-x-[0.875rem]">
          {communities && communities?.data?.length > 0
            ? communities?.data?.map((community) => (
                <CommunityCard key={community?._id} data={community} />
              ))
            : null}
        </div>
        <Suspense>
          <Pagination
            currentPage={communities?.currentPage || 1}
            totalPages={communities?.totalPages || 1}
            className="border-none p-0"
          />
        </Suspense>
      </section>
    </>
  );
}

export default page;
