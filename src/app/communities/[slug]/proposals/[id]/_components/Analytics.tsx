import RChart from "@/components/shared/RChart";
import { VoteProps } from "@/types/proposals";
import React from "react";

const Analytics = ({ votes }: { votes: VoteProps[] }) => {
  const forVotes = votes.filter((vote) => vote?.vote?.toLowerCase() === "for");
  const againstVotes = votes.filter(
    (vote) => vote?.vote?.toLowerCase() === "against"
  );
  const abstainVotes = votes.filter(
    (vote) => vote?.vote?.toLowerCase() === "abstain"
  );

  const chartData = [
    { name: "for", amount: forVotes.length, fill: "#FF9800" },
    { name: "against", amount: againstVotes.length, fill: "#4CAF50" },
    { name: "abstain", amount: abstainVotes.length, fill: "#FF0606" },
  ];

  return (
    <div className="rounded-xl bg-white p-4 pb-8 border border-alice-blue">
      <h3 className="text-shark text-xs uppercase font-bold mb-[0.375rem]">
        VOTE ANALYTICS
      </h3>
      <p className="text-xs text-dove-gray">
        How members of the community voted
      </p>
      <div>
        <RChart data={chartData} />
        <ul className="text-xs text-mako space-y-2">
          {chartData?.map((data, index) => (
            <li key={index}>
              <span
                style={{
                  backgroundColor: data?.fill,
                }}
                className={`size-[0.375rem] mb-0.5 inline-block mr-2 rounded-full`}
              />
              <span className="capitalize">{data?.name}:</span>{" "}
              <span className="font-bold text-shark">{data?.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Analytics;
