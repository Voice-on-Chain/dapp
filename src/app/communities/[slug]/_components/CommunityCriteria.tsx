"use client";
import CopyIcon from "@/components/custom-icons/CopyIcon";
import RAvatar from "@/components/ui/avatar-compose";
import Modal from "@/components/ui/modal";
import useUser from "@/hooks/use-user";
import { cn, shortenAddress } from "@/lib/utils";
import { ConfigProps } from "@/types/community";
import Link from "next/link";
import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { toast } from "sonner";
import JoinOrLeaveCommunity from "./JoinOrLeaveCommunity";

interface AddressCardProps {
  // href: string;
  title: string;
  value: string;
  truncate?: boolean;
}

const AddressCard = ({
  // href,
  title,
  value,
  truncate = true,
}: AddressCardProps) => {
  const copyHandler = () => {
    navigator.clipboard.writeText(value);
    toast("Address Copied.");
  };
  return (
    <div
      // href={href}
      className="w-full bg-white text-mako p-3 lg:p-[0.875rem] border-t border-athens py-18 flex items-start justify-between"
    >
      <div className="flex items-start space-x-[0.625rem]">
        {/* <span className="size-[1.125rem] inline-block rounded-full bg-athens"></span> */}
        <span>
          <h4 className="text-mako mb-2 font-medium uppercase text-xs">
            {title}
          </h4>
          <button
            onClick={copyHandler}
            className="text-xs text-abbey flex items-center space-x-[0.375rem]"
          >
            <span>{truncate ? shortenAddress(value) : value}</span>
            <CopyIcon />
          </button>
        </span>
      </div>
      <GoArrowUpRight size={12} />
    </div>
  );
};

interface CommunityCriteriaProps {
  disableJoin?: boolean;
  creator: string;
  contract_address: string;
  criterias: string[];
  members: string[];
  communityId: string;
  config: ConfigProps | null;
  website: string;
  twitter: string;
}

const CommunityCriteria = ({
  members,
  disableJoin,
  creator,
  contract_address,
  criterias,
  communityId,
  config,
  website,
  twitter,
}: CommunityCriteriaProps) => {
  return (
    <>
      <div className="w-full bg-white rounded-lg text-mako p-3 pb-6 lg:p-4 lg:pb-8 border border-alice-blue">
        <h2 className="font-bold text-xs text-shark mb-3">
          COMMUNITY CRITERIA
        </h2>
        <ul className="mb-18 list-decimal pl-4 list-outside space-y-3 text-dove-gray text-xs">
          {criterias.map((criteria, index) => (
            <li key={index} className="first-letter:capitalize">
              {criteria}
            </li>
          ))}
        </ul>
        <div>
          <AddressCard
            // href={EXPLORER(`/account/${contract_address}`)}
            title="CONTRACT ADDRESS"
            value={contract_address}
          />
          <AddressCard
            // href={EXPLORER(`/account/${creator}`)}
            title="CREATOR ADDRESS"
            value={creator}
          />
          {website ? (
            <AddressCard
              // href={website}
              title="WEBSITE"
              value={website}
              truncate={false}
            />
          ) : null}
          {twitter ? (
            <AddressCard
              // href={twitter}
              title="TWITTER"
              value={twitter}
              truncate={false}
            />
          ) : null}
        </div>
        <JoinOrLeaveCommunity
          members={members}
          creator={creator}
          disableJoin={disableJoin || false}
          community={communityId}
          config={config}
        />
      </div>
    </>
  );
};

export default CommunityCriteria;
