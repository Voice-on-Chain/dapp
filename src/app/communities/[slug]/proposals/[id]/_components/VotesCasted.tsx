import React from "react";

import RAvatar from "@/components/ui/avatar-compose";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VoteProps } from "@/types/proposals";

export function VoteTable({ data }: { data: VoteProps[] }) {
  return (
    <div className="border border-alice-blue rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {["member", "voted"].map((head) => (
              <TableHead
                key={head}
                className="font-medium first-of-type:w-[15.9375rem] first-of-type:pl-[1.875rem] py-[0.875rem] capitalize text-sm text-dove-gray"
              >
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((member, index) => (
            <TableRow key={member?._id}>
              <TableCell>
                <span className="flex items-center pl-[1.5rem] text-sm text-mako space-x-2">
                  <RAvatar
                    src={member?.by?.profilePhoto?.url}
                    className="size-8"
                  />
                  <span>@{member?.by?.username}</span>
                </span>
              </TableCell>
              <TableCell className="text-sm capitalize text-mako">
                {member?.vote}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const VotesCasted = ({ votes }: { votes: VoteProps[] }) => {
  return (
    <div className="rounded-xl bg-white p-4 lg:p-6 border border-alice-blue">
      <h3 className="text-shark text-xs uppercase font-bold mb-3">
        VOTES Casted
      </h3>
      <VoteTable data={votes} />
    </div>
  );
};

export default VotesCasted;
