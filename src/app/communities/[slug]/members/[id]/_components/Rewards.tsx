"use client";
import React from "react";

import { VoiceCircleIcon } from "@/components/custom-icons/VoiceIcon";
import RAvatar from "@/components/ui/avatar-compose";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import RetractVoice from "../../_components/RetractVoice";

const data = [
  {
    voiceLent: 50,
    dateLent: "Sat, 5th Sept 2024",
    reward: 30,
    rewardDate: "Fri, 12th Sept 2024",
  },
];

interface TRowProps {
  voiceLent: number;
  dateLent: string;
  reward: number;
  rewardDate: string;
}

const TRow = ({ reward }: { reward: TRowProps }) => {
  return (
    <TableRow>
      <TableCell className="text-sm p-[0.875rem] capitalize text-mako">
        <span className="flex items-center space-x-2">
          <span className="*:size-6">
            <VoiceCircleIcon />
          </span>
          <span>{reward?.voiceLent}</span>
        </span>
      </TableCell>
      <TableCell className="text-sm p-[0.875rem] capitalize text-mako">
        {reward?.dateLent}
      </TableCell>
      <TableCell className="text-sm p-[0.875rem] capitalize text-mako">
        <span className="flex items-center space-x-2">
          <Image
            src="/svgs/cell-icon.svg"
            alt="token"
            width={24}
            height={24}
            className="rounded-full object-cover object-center"
          />
          <span>{reward?.reward}</span>
        </span>
      </TableCell>
      <TableCell className="text-sm p-[0.875rem] capitalize text-mako">
        {reward?.rewardDate}
      </TableCell>
      <TableCell className="text-sm capitalize text-mako">
        <span className="flex items-center space-x-2">
          <RetractVoice />
          <button className="rounded-md border border-gainsboro px-[1.0625rem] py-[0.5625rem] shadow-btn">
            Claim Rewards
          </button>
        </span>
      </TableCell>
    </TableRow>
  );
};

const Rewards = () => {
  return (
    <div className="rounded-xl bg-white border p-4 lg:p-6 max-w-[62.125rem] border-alice-blue">
      <h2 className="text-sm font-medium border-b border-alice-blue pb-[0.875rem] text-dove-gray uppercase">
        Rewards
      </h2>
      <div className="my-4 lg:my-6 bg-alabaster py-3 px-[0.875rem] flex items-center justify-between gap-4 text-mako text-xs lg:text-sm rounded-lg">
        <span className="flex items-center space-x-2">
          <RAvatar className="size-8" />
          <span>0x4....698R</span>
        </span>
        <span>10 Posts</span>
        <span>2 Proposals</span>
        <span>4 Polls</span>
      </div>
      <div className="whitespace-nowrap overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "Voice lent",
                "date Lent",
                "Reward",
                "Reward date",
                "Action",
              ].map((head) => (
                <TableHead
                  key={head}
                  className="font-medium p-[0.875rem] uppercase text-sm text-dove-gray"
                >
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((reward, index) => (
              <TRow key={index} reward={reward} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Rewards;
