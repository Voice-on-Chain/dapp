import RBreadcrumb from "@/components/ui/breadcrumb-compose";
import { notFound } from "next/navigation";
import React from "react";
import Rewards from "./_components/Rewards";

function page({
  params,
}: {
  params: {
    slug: string;
    id: string;
  };
}) {
  const slug = params?.slug;
  if (!slug) {
    notFound();
  }

  return (
    <>
      <header className="mt-4 lg:mt-5 mb-18 max-w-[62.125rem]">
        <div className="border border-white-smoke-4 rounded-lg py-6 px-5 bg-white">
          <RBreadcrumb
            prevPaths={[
              { href: "/communities/hello", label: "Cellana" },
              { label: "Members", href: "/communities/hello/members" },
            ]}
            activePath="Rewards"
          />
        </div>
      </header>
      <Rewards />
    </>
  );
}

export default page;
