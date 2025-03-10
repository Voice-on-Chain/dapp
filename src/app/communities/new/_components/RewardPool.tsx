import { SwapInput, TokenProps } from "../../[slug]/swap/_components/Swap";
import React, { useTransition, useState } from "react";
import { DateInput } from "@/components/ui/date-input";
import { useRouter } from "next/navigation";
import useCreateCommunityStore from "@/store/community.store";

export const RewardPool = () => {
  const { update, data } = useCreateCommunityStore();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [value, setValue] = useState<TokenProps>({
    value: 0,
    balance: 0,
    icon: data?.logo ? URL.createObjectURL(data?.logo) : "",
    name: data?.name || "",
  });

  const handleValueChange = (name: string, value: number, balance = 0) => {
    setValue((prev) => ({ ...prev, value, balance }));
  };

  const handler = () => {
    update({
      token_to_distribute: value?.value,
      distribution_date: endDate,
    });
    startTransition(() => {
      router.push("/communities/new/review");
    });
  };

  return (
    <div>
      <div className="w-full space-y-5 mb-8">
        <SwapInput
          label="How much total token do you want to distribute?"
          value={value}
          name="to"
          onChangeHandler={handleValueChange}
          className="w-full rounded-lg py-[0.5625rem] [&>input]:!text-sm"
        />
        <div className="flex flex-col w-full">
          <label className="font-normal mb-2 text-sm block text-mako">
            How long should it last for?
          </label>
          <DateInput
            value={endDate}
            onChange={(value) => {
              setEndDate(value);
            }}
            noForm
          />
        </div>
      </div>
      <button
        disabled={pending || !value?.value || !endDate}
        onClick={handler}
        className="bg-accent disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 w-fit ml-auto mr-0 hover:bg-teal block text-white font-medium text-sm rounded-lg"
      >
        {pending ? "Loading..." : "Review"}
      </button>
    </div>
  );
};
