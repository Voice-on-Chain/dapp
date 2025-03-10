"use client";
import React, { Suspense } from "react";

import { VoiceCircleIcon } from "@/components/custom-icons/VoiceIcon";
import Pagination from "@/components/shared/Pagination";
import RAvatar from "@/components/ui/avatar-compose";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import RetractVoice from "./RetractVoice";
import { UserProps } from "@/types/user";
import { useAccount } from "wagmi";

const TRow = ({
  index,
  member,
  community,
}: {
  index: number;
  community: string;
  member: UserProps;
}) => {
  const { address } = useAccount();

  const lended = member.lenders.find(
    (lender) => lender?.by?.address === address
  );

  return (
    <TableRow>
      <TableCell className="p-[0.875rem]">
        <span className="flex items-center text-sm text-mako space-x-2">
          <RAvatar className="size-8" />
          <span>@{member?.username}</span>
        </span>
      </TableCell>
      <TableCell className="text-sm capitalize text-mako text-center">
        👏 -
      </TableCell>
      <TableCell className="text-sm capitalize text-mako">
        <span className="flex items-center justify-center space-x-2">
          <VoiceCircleIcon />
          <span>
            {member?.lenders.reduce((total, lend) => {
              return total + lend?.voicePower;
            }, 0)}
          </span>
        </span>
      </TableCell>
      <TableCell className="text-sm capitalize text-mako">
        <span className="flex items-center space-x-2">
          {lended ? (
            <>
              <RetractVoice />
              <Link
                href={`/communities/${community}/members/${index}`}
                className="rounded-md border border-gainsboro px-[1.0625rem] py-[0.5625rem] shadow-btn"
              >
                View rewards
              </Link>
            </>
          ) : address !== member?.address ? (
            <button className="rounded-md border border-gainsboro px-[1.0625rem] py-[0.5625rem] shadow-btn">
              Lend Voice
            </button>
          ) : null}
        </span>
      </TableCell>
    </TableRow>
  );
};

const Members = ({
  community,
  data,
}: {
  community: string;
  data: UserProps[];
}) => {
  return (
    <div className="rounded-xl bg-white border whitespace-nowrap overflow-auto border-alice-blue max-w-[62.125rem]">
      <Table>
        <TableHeader>
          <TableRow>
            {["member", "Total Applauds", "Total Voice Power", "Action"].map(
              (head) => (
                <TableHead
                  key={head}
                  className="font-medium first-of-type:w-[15.9375rem] p-[0.875rem] uppercase text-sm text-dove-gray"
                >
                  {head}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((member, index) => (
            <TRow
              index={index}
              community={community}
              key={member?._id}
              member={member}
            />
          ))}
        </TableBody>
      </Table>
      <Suspense>
        <Pagination />
      </Suspense>
    </div>
  );
};

export default Members;
