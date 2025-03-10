import GoBack from "@/components/shared/GoBack";
import { getProposal } from "@/services/proposal";
import { notFound } from "next/navigation";
import React from "react";
import Analytics from "./_components/Analytics";
import ProposalInfo from "./_components/ProposalInfo";
import Votes from "./_components/Votes";
import VotesCasted from "./_components/VotesCasted";

async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params?.id;
  const proposal = await getProposal(id);

  if (!proposal?._id) {
    notFound();
  }

  return (
    <>
      <header className="border mt-4 lg:mt-5 mb-4 max-w-[62.125rem] bg-white border-white-smoke-4 rounded-lg py-6 px-5">
        <GoBack />
      </header>
      <section className="lg:flex lg:items-start lg:space-x-18 max-w-[62.125rem]">
        <div className="w-full lg:max-w-[34.875rem] space-y-[0.875rem]">
          <ProposalInfo data={proposal} />
          <VotesCasted votes={proposal?.votes} />
        </div>
        <div className="w-full lg:max-w-[26.125rem] lg:space-y-[0.875rem] sticky top-4">
          <Votes
            id={proposal?._id || ""}
            options={proposal?.options || []}
            type={proposal?.type || "basic"}
            endDate={proposal?.endDate}
            proposalConfig={proposal?.community?.proposal}
            votes={proposal?.votes}
          />
          <Analytics votes={proposal?.votes} />
        </div>
      </section>
    </>
  );
}

export default page;
