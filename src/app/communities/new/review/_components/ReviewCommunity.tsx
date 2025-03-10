"use client";
import { createCommunity } from "@/actions/community";
import CommunityCriteria from "@/app/communities/[slug]/_components/CommunityCriteria";
import CommunityInfo from "@/app/communities/[slug]/_components/CommunityInfo";
import CommunityPosts from "@/app/communities/[slug]/_components/CommunityPosts";
import CommunityRewardPool from "@/app/communities/[slug]/_components/CommunityRewardPool";
import CommunityStats from "@/app/communities/[slug]/_components/CommunityStats";
import CompleteProfile from "@/components/shared/CompleteProfile";
import GoBack from "@/components/shared/GoBack";
import RAvatar from "@/components/ui/avatar-compose";
import Modal from "@/components/ui/modal";
import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import useCreateCommunityStore from "@/store/community.store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const CreateCommunity = () => {
  const [creatingCommunity, setCreatingCommunityState] = useState(false);
  const [createdCommunity, setCreatedCommunity] = useState(false);
  const { address } = useAccount();
  const { data } = useCreateCommunityStore();
  const { user } = useUser();
  const [communityId, setCommunityId] = useState("");
  const [hash, setHash] = useState("");
  const router = useRouter();

  const uploadBanner = async () => {
    const formData = new FormData();
    formData.append("file", data?.banner as Blob);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${address}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to upload banner");
    }

    return await response.json();
  };

  const uploadLogo = async () => {
    const formData = new FormData();
    formData.append("file", data?.logo as Blob);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${address}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to upload logo");
    }

    return await response.json();
  };

  const createHandler = async () => {
    setCreatedCommunity(false);
    setCreatingCommunityState(true);

    try {
      const banner = await uploadBanner();
      const logo = await uploadLogo();

      const response = await createCommunity(address!, {
        ...data,
        distribution_date: data?.distribution_date?.toISOString(),
        banner,
        logo,
        creator: user?._id,
      });

      if (response?.message || !response?._id) {
        toast.error(response?.message || "Failed to create community", {
          className: "error-message",
        });
        setCreatingCommunityState(false);
        return;
      }

      const id = response?._id;
      setCommunityId(id);

      setCreatingCommunityState(false);
    } catch (error) {
      toast.error(
        typeof error === "string" ? error : "Failed to create community",
        {
          className: "error-message",
        }
      );
      setCreatingCommunityState(false);
    }
  };
  return (
    <>
      {user?._id ? (
        <button
          onClick={createHandler}
          className={cn(
            "bg-accent self-end lg:self-auto px-4 py-2.5 w-full max-w-[12.5625rem] hover:bg-teal block text-white font-medium text-sm rounded-lg"
          )}
        >
          Create Community
        </button>
      ) : null}
      <Modal
        isOpen={creatingCommunity}
        closeHandler={() => {
          router.push("/communities");
          setCreatingCommunityState(false);
        }}
      >
        <div className="flex items-center text-center flex-col">
          <RAvatar className="size-8 lg:size-[3.5rem] mb-[0.875rem]" />
          <h4 className="text-mako text-lg lg:text-s20 font-medium">
            {createdCommunity ? "Community Created" : "Creating..."}
          </h4>
          {createdCommunity ? null : (
            <p className="text-xs lg:text-sm mt-1 text-mako">
              Creating Cellena Finance Community
            </p>
          )}
        </div>
        {createdCommunity ? (
          <>
            <Link
              href={
                communityId ? `/communities/${communityId}` : "/communities"
              }
              className="bg-accent px-4 text-center py-2.5 mt-7 w-full ml-auto mr-0 hover:bg-teal block text-white font-medium text-sm rounded-lg"
            >
              View Community
            </Link>
          </>
        ) : null}
      </Modal>
    </>
  );
};

const generateImageUrl = (data: any) => {
  try {
    if (typeof data === "string") return null;
    return URL.createObjectURL(data);
  } catch (error) {
    return null;
  }
};

const ReviewCommunity = () => {
  const { data } = useCreateCommunityStore();
  const { address } = useAccount();
  return (
    <>
      <CompleteProfile />
      <section className="bg-white rounded-lg border border-alice-blue p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between mb-4 lg:items-center gap-4">
          <span className="flex items-center space-x-2 lg:space-x-4">
            <GoBack />
            <h3 className="font-medium text-sm text-mako md:text-base lg:text-lg">
              Review Details
            </h3>
          </span>
          <CreateCommunity />
        </div>
        <div className="max-w-[62.125rem] overflow-hidden relative bg-white-smoke-4 rounded-lg my-[0.875rem] min-h-[11.9375rem]">
          {data?.banner ? (
            <Image
              className="object-cover object-top"
              src={generateImageUrl(data?.banner) ?? "/svgs/gradient-bg.svg"}
              alt="banner"
              fill
            />
          ) : null}
        </div>
        <div className="lg:flex lg:items-start lg:space-x-[0.875rem]">
          <div className="w-full lg:max-w-[41.125rem] space-y-[0.875rem]">
            <CommunityInfo
              name={data?.name || ""}
              description={data?.description || ""}
              logo={generateImageUrl(data?.logo) ?? ""}
              creator={address || ""}
            />
            <CommunityStats community="" members={0} proposals={0} polls={0} />
            <CommunityPosts />
          </div>
          <div className="w-full lg:max-w-[20.125rem] lg:space-y-[0.875rem] sticky top-4">
            <CommunityCriteria
              criterias={data?.criterias || []}
              members={[]}
              disableJoin
              contract_address={data?.contract_address || ""}
              creator={address || ""}
              communityId=""
              config={null}
              twitter={data?.twitter || ""}
              website={data?.website || ""}
            />
            <CommunityRewardPool amount={data?.token_to_distribute || 0} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewCommunity;
