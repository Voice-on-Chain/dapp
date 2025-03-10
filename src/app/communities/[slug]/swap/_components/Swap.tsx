"use client";
import CurveLine from "@/components/custom-icons/CurveLine";
import SwapIcon from "@/components/custom-icons/SwapIcon";
import RAvatar from "@/components/ui/avatar-compose";
import Modal from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export interface TokenProps {
  name: string;
  icon: string;
  value: number;
  balance: number;
}

interface SwapInputProps {
  name: string;
  label: string;
  value: TokenProps;
  onChangeHandler: (name: string, value: number, balance?: number) => void;
  balance?: number;
  className?: string;
}

export const SwapInput = ({
  name,
  label,
  balance,
  value,
  onChangeHandler,
  className,
}: SwapInputProps) => {
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    onChangeHandler(name, value, balance);
  };
  return (
    <div>
      <span className="flex items-end justify-between text-mako w-full mb-[0.625rem]">
        <h6 className="text-sm lg:text-base">{label}</h6>
        {balance ? (
          <span className="text-s10 lg:text-xs">
            Available {balance.toLocaleString()} {value?.name}
          </span>
        ) : null}
      </span>
      <div
        className={cn(
          "border border-concrete rounded-md py-3 px-2 flex justify-between items-center",
          className
        )}
      >
        <span className="flex items-center space-x-2">
          <RAvatar src={value?.icon} className="size-5 lg:size-6" />
          <span className="text-sm text-mako inline-block">{value?.name}</span>
        </span>
        <input
          min={0}
          type="number"
          value={value?.value}
          className="outline-none border-none text-right p-0 text-base lg:text-xl text-mako"
          onChange={inputHandler}
        />
      </div>
    </div>
  );
};

const Warning = ({ minimum_to_join }: { minimum_to_join: number }) => {
  return (
    <div className="bg-rose-white py-3 text-scarlet space-y-2 px-[0.8125rem] mb-[2.25rem]">
      <IoIosWarning size={24} />
      <p className="text-xs lg:text-sm">
        Minimum voice token to join the community is {minimum_to_join}.You do
        not have enough DCASK token to swap in order to get Voice token to
        increase your engagement in the community.
      </p>
    </div>
  );
};

const Swap = () => {
  const minimum_to_join = 5;
  const rate = 1000;
  const [loading, setLoading] = useState(false);
  const { isConnected } = useAccount();
  const [from, setFrom] = useState<TokenProps>({
    value: 0,
    balance: 0,
    icon: "/svgs/cell-icon.svg",
    name: "CELL",
  });
  const [to, setTo] = useState<TokenProps>({
    value: 0,
    balance: 0,
    icon: "/svgs/voice-icon.svg",
    name: "VOICE TOKEN",
  });

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleValuesChange = (name: string, value: number, balance = 0) => {
    if (name === "from") {
      setFrom((prev) => ({ ...prev, value, balance }));
      if (value > 0 && isConnected) {
        setTo((prev) => ({ ...prev, value: value / rate }));
      }
      return;
    }

    if (name === "to") {
      setTo((prev) => ({ ...prev, value, balance }));
      if (value > 0 && isConnected) {
        setFrom((prev) => ({ ...prev, value: value * rate }));
      }
      return;
    }
  };

  const swapHandler = () => {
    setLoading(true);
    setTimeout(() => {
      toast("Swap Successful", {
        description: "Swapped 100,000 DCASK for 300 Voice Token",
        duration: 1000,
        position: "top-right",
        closeButton: true,
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start gap-5 justify-between">
        <div className="border border-alice-blue bg-white rounded-xl py-[1.6875rem] px-[1.375rem] w-full lg:max-w-[39.25rem]">
          <div className="flex items-center mb-[1.375rem] justify-between">
            <h2 className="text-mako text-lg lg:text-s22 font-medium">Swap</h2>
            <span className="flex items-center justify-center px-4 py-[0.625rem] border border-alice-blue rounded-lg text-xs lg:text-sm text-mako font-medium text-center">
              {rate.toLocaleString()} CELL = 1 Voice Token
            </span>
          </div>
          <div className="mb-[2.875rem]">
            <SwapInput
              name="from"
              balance={10000}
              label="Swap"
              value={from}
              onChangeHandler={handleValuesChange}
            />
            <span className="block my-4 w-full border-t border-gallery-2 relative">
              <button
                onClick={handleSwap}
                className="absolute -top-3 left-1/2 -translate-x-1/2"
              >
                <SwapIcon />
              </button>
            </span>
            <SwapInput
              label="You get"
              value={to}
              name="to"
              onChangeHandler={handleValuesChange}
            />
          </div>
          {from?.value > from?.balance || to?.value < minimum_to_join ? (
            <Warning minimum_to_join={minimum_to_join} />
          ) : null}
          <button
            onClick={swapHandler}
            disabled={
              from?.value > from?.balance ||
              from?.value === 0 ||
              to?.value === 0 ||
              loading
            }
            className={cn(
              "bg-accent px-4 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 w-full ml-auto mr-0 hover:bg-teal block text-white font-medium text-sm rounded-lg"
            )}
          >
            {loading ? "Processing..." : "Swap & Stake"}
          </button>
        </div>
        <div className="border border-alice-blue bg-white rounded-xl p-4 w-full lg:max-w-[21.625rem]">
          <h5 className="text-xs font-bold text-shark mb-3">
            CELLENA FINANCE VOICE TOKEN
          </h5>
          <span className="flex items-center space-x-3">
            <span className="flex items-center -space-x-2">
              <RAvatar src="/svgs/cell-icon.svg" className="size-5 lg:size-6" />
              <RAvatar
                src="/svgs/voice-icon.svg"
                className="size-5 lg:size-6"
              />
            </span>
            <h4 className="text-xl lg:text-s28 text-shark font-bold">0</h4>
          </span>
        </div>
      </div>
      <Modal
        isOpen={loading}
        closeHandler={() => setLoading(false)}
        className="w-[24.125rem]"
      >
        <div className="flex items-center flex-col text-center">
          <span className="rounded-full size-9 lg:size-[3.5rem] mb-[0.875rem] bg-mako block"></span>
          <h4 className="text-lg lg:text-xl font-medium text-mirage mb-[0.375rem]">
            Swapping
          </h4>
          <h5 className="text-xs lg:text-sm text-tundora mb-7">
            Swap {from?.name} for {to?.name}
          </h5>
          <div className="flex items-start space-x-4">
            <span className="flex items-center flex-col space-y-1">
              <RAvatar src={from?.icon} className="size-5 lg:size-6" />
              <span className="text-xs lg:text-sm text-mako">{from?.name}</span>
            </span>
            <CurveLine />
            <span className="flex items-center flex-col space-y-1">
              <RAvatar src={to?.icon} className="size-5 lg:size-6" />
              <span className="text-xs lg:text-sm text-mako">{to?.name}</span>
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Swap;
