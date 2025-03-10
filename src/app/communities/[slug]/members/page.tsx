import RAvatar from "@/components/ui/avatar-compose";
import RBreadcrumb from "@/components/ui/breadcrumb-compose";
import { formatLargeNumber } from "@/lib/utils";
import { getCommunityMembers } from "@/services/community";
import { notFound } from "next/navigation";
import React from "react";
import Members from "./_components/Members";

async function page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = params?.slug;

  const community = await getCommunityMembers(slug);
  if (!slug || !community?.name) {
    notFound();
  }

  return (
    <>
      <header className="mt-4 lg:mt-5 mb-18 max-w-[62.125rem]">
        <div className="border flex items-center justify-between border-white-smoke-4 rounded-lg py-6 px-5 bg-white">
          <RBreadcrumb
            prevPaths={[
              { href: `/communities/${slug}`, label: community?.name || "" },
            ]}
            activePath="Members"
          />

          <div className="flex items-center space-x-3">
            <RAvatar
              src={community?.logo?.url}
              className="size-[2.5rem] inline-block rounded-full bg-athens"
            />
            <h5 className="text-2xl lg:text-s32 font-medium">
              {formatLargeNumber(community?.members?.length || 0)}{" "}
              <span className="text-gray text-sm lg:text-base font-normal">
                Members
              </span>
            </h5>
          </div>
        </div>
      </header>
      <Members community={slug} data={community?.members || []} />
    </>
  );
}

export default page;
