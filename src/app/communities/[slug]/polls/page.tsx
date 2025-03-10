import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import PollCard from "@/components/shared/PollCard";
import Tabs from "@/components/shared/Tabs";
import RBreadcrumb from "@/components/ui/breadcrumb-compose";
import { formatLargeNumber } from "@/lib/utils";
import { getCommunityPolls } from "@/services/community";
import { PollsRoot } from "@/types/poll";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import CreatePoll from "../_components/CreatePoll";
import RAvatar from "@/components/ui/avatar-compose";

async function page({
  params,
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams: {
    status?: string;
    page?: string;
  };
}) {
  const status = searchParams?.status || "all";
  const slug = params?.slug;

  const page = Number(searchParams?.page) || 1;

  const community: PollsRoot | null = await getCommunityPolls(
    slug,
    page,
    status === "all" ? "" : status
  );

  if (!slug || !community?.name) {
    notFound();
  }

  return (
    <>
      <header className="border mt-4 lg:mt-5 mb-18 max-w-[62.125rem] bg-white border-white-smoke-4 rounded-lg py-6 px-5">
        <div className="flex items-center justify-between">
          <RBreadcrumb
            prevPaths={[
              { href: `/communities/${slug}`, label: community?.name || "" },
            ]}
            activePath="Polls"
          />

          <div className="flex items-center space-x-3">
            <RAvatar
              src={community?.logo?.url}
              className="size-[2.5rem] inline-block rounded-full bg-athens"
            />
            <h5 className="text-2xl lg:text-s32 font-medium flex items-center space-x-2">
              <span>
                {formatLargeNumber(community?.polls?.data?.length || 0)}
              </span>
              <span className="text-gray text-sm lg:text-base font-normal">
                Polls
              </span>
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-between border-alice-blue border-t pt-18 mt-18">
          <Suspense>
            <Tabs active={status} routes={["all", "active", "closed"]} />
          </Suspense>
          <CreatePoll communityId={slug} />
        </div>
      </header>
      <section className="mt-[0.875rem] bg-white border max-w-[62.125rem] border-white-smoke-4 rounded-lg p-4">
        {community?.polls?.data?.length > 0 ? (
          <div className="space-y-6 lg:space-y-10">
            <div className="grid md:grid-cols-2 gap-4">
              {community?.polls?.data?.map((poll, index) => (
                <PollCard key={poll?._id} data={poll} />
              ))}
            </div>
            <Suspense>
              <Pagination
                currentPage={community?.polls?.currentPage || 1}
                totalPages={community?.polls?.totalPages || 1}
                className="border-none p-0"
              />
            </Suspense>
          </div>
        ) : (
          <EmptyState />
        )}
      </section>
    </>
  );
}

export default page;
