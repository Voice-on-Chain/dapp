import PollCard from "@/components/shared/PollCard";
import PostCard from "@/components/shared/PostCard";
import ProposalCard from "@/components/shared/ProposalCard";
import { search } from "@/services/search";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) => {
  const query = searchParams?.query;
  if (!query) {
    redirect("/");
  }

  const result = await search(query);

  return (
    <>
      <header className="mt-10 lg:mt-[3.75rem] border-b pb-[0.875rem] mb-[0.81rem] border-alice-blue max-w-[59.625rem]">
        <h1 className="text-2xl font-medium text-mako">
          Search result for{" "}
          <span className="py-1 px-2 inline-block bg-azure rounded-md">
            {query}
          </span>{" "}
          ({result?.length || 0})
        </h1>
      </header>
      <section>
        <div className="space-y-3 max-w-[43.625rem]">
          {result?.map((data: any, index: number) => {
            if (data?.type === "post") {
              return <PostCard key={index} data={data?.data} />;
            }
            if (data?.type === "poll") {
              return <PollCard key={index} data={data?.data} />;
            }

            if (data?.type === "proposal") {
              return <ProposalCard key={index} data={data?.data} />;
            }
            return <></>;
          })}
        </div>
      </section>
    </>
  );
};

export default page;
