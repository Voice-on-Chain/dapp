import RChart from "@/components/shared/RChart";
import { currencyFormatter } from "@/lib/utils";
import React from "react";

interface CommunityRewardPoolProps {
  amount: number;
}

const CommunityRewardPool = ({ amount }: CommunityRewardPoolProps) => {
  const chartData = [
    { name: "Amount left", amount, fill: "#00BCD4" },
    { name: "Amount spent", amount: 0, fill: "#FD8282" },
  ];
  return (
    <div className="w-full bg-white rounded-lg text-mako p-3 pb-6 lg:p-4 lg:pb-8 border border-alice-blue">
      <h3 className="text-shark text-xs font-bold mb-[0.375rem]">
        REWARD POOL
      </h3>
      <p className="text-xs text-dove-gray">
        Rewards are distributed as you engage on the platform
      </p>
      <div>
        <RChart data={chartData} />
        <div className="mt-4">
          <h4 className="text-xs text-abbey mb-1">Total Amount</h4>
          <h5 className="font-bold text-shark text-lg lg:text-s20">
            {currencyFormatter(amount, 0, "$")}
          </h5>
          <ul className="mt-4 text-xs text-mako space-y-2">
            {chartData?.map((data, index) => (
              <li key={index}>
                <span
                  style={{
                    backgroundColor: data?.fill,
                  }}
                  className={`size-[0.375rem] mb-0.5 inline-block mr-2 rounded-full`}
                />
                {data?.name}{" "}
                <span className="font-bold text-shark">
                  {currencyFormatter(data?.amount, 0, "$")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityRewardPool;
