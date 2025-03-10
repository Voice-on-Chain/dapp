import CommunityCriteria from "@/app/communities/[slug]/_components/CommunityCriteria";
import CommunityInfo from "@/app/communities/[slug]/_components/CommunityInfo";
import GoBack from "@/components/shared/GoBack";
import PostCard from "@/components/shared/PostCard";
import { getComments, getPost } from "@/services/post";
import { notFound } from "next/navigation";
import React from "react";
import Comments from "./_components/Comments";

async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params?.id;
  const data = await getPost(id);
  const comments = await getComments(id);

  if (!data?._id) {
    notFound();
  }

  return (
    <div>
      <span className="block mb-3 lg:mb-18  mt-6 lg:mt-[2.6875rem]">
        <GoBack />
      </span>
      <section className="flex flex-col gap-4 lg:flex-row">
        <div className="space-y-[1.1875rem]">
          <PostCard data={data} />
          <Comments data={comments} />
        </div>
        <div className="space-y-4">
          <CommunityInfo
            name={data?.community?.name || ""}
            description={data?.community?.description || ""}
            logo={data?.community?.logo?.url || ""}
            creator={data?.community?.creator?.address || ""}
          />
          <CommunityCriteria
            members={data?.community?.members || []}
            criterias={data?.community?.criterias || []}
            contract_address={data?.community?.contract_address}
            creator={data?.community?.creator?.address}
            config={{
              post: data?.community?.post || null,
              proposal: data?.community?.proposal || null,
              poll: data?.community?.poll || null,
              comment: data?.community?.comment || null,
            }}
            communityId={data?.community?._id}
            website={data?.community?.website || ""}
            twitter={data?.community?.twitter || ""}
          />
        </div>
      </section>
    </div>
  );
}

export default page;
