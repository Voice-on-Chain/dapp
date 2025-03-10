import EmptyState from "@/components/shared/EmptyState";
import Pagination from "@/components/shared/Pagination";
import ProposalCard from "@/components/shared/ProposalCard";
import Tabs from "@/components/shared/Tabs";
import RAvatar from "@/components/ui/avatar-compose";
import RBreadcrumb from "@/components/ui/breadcrumb-compose";
import { formatLargeNumber } from "@/lib/utils";
import { getCommunityProposals } from "@/services/community";
import { Root } from "@/types/proposals";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import CreateProposal from "../_components/CreateProposal";

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

  const community: Root | null = await getCommunityProposals(
    slug,
    page,
    status
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
            activePath="Proposals"
          />

          <div className="flex items-center space-x-3">
            <RAvatar
              src={community?.logo?.url}
              className="size-[2.5rem] inline-block rounded-full bg-athens"
            />
            <h5 className="text-2xl lg:text-s32 font-medium flex items-center space-x-2">
              <span>
                {formatLargeNumber(community?.proposals?.data?.length || 0)}
              </span>
              <span className="text-gray text-sm lg:text-base font-normal">
                Proposals
              </span>
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-between border-alice-blue border-t pt-18 mt-18">
          <Suspense>
            <Tabs active={status} routes={["all", "active", "closed"]} />
          </Suspense>
          <CreateProposal communityId={slug} />
        </div>
      </header>
      <section className="mt-[0.875rem] max-w-[62.125rem] bg-white border border-white-smoke-4 rounded-lg p-4">
        {community?.proposals?.data?.length > 0 ? (
          <div className="space-y-6 lg:space-y-10">
            <div className="grid md:grid-cols-2 gap-4">
              {community?.proposals?.data?.map((proposal, index) => (
                <ProposalCard
                  key={index}
                  data={proposal}
                  isClosed={status === "closed"}
                />
              ))}
            </div>
            <Suspense>
              <Pagination
                currentPage={community?.proposals?.currentPage || 1}
                totalPages={community?.proposals?.totalPages || 1}
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
