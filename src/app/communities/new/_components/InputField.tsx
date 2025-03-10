import RAvatar from "@/components/ui/avatar-compose";
import RSelect from "@/components/ui/select-input";
import RTooltip from "@/components/ui/tooltip-compose";
import { cn } from "@/lib/utils";
import React from "react";

interface InputProps {
  name?: string;
  label?: string;
  value: string | number;
  onChangeHandler?: (value: number) => void;
  className?: string;
  icon?: string;
  disabled?: boolean;
  tooltip?: string;
}

export const InputFieldWithSelect = ({
  label,
  value,
  onChangeHandler,
  className,
  disabled,
}: InputProps) => {
  const selectHandler = (value: string) => {
    value = value?.replace("months", "")?.replace("month", "");
    onChangeHandler?.(Number(value));
  };

  return (
    <div className="w-full">
      {label ? (
        <h6 className="text-sm text-mako w-full mb-2">{label}</h6>
      ) : null}
      <div
        className={cn(
          "border border-concrete w-full rounded-md py-[0.5625rem] px-2 flex justify-between items-center",
          className
        )}
      >
        <span className="flex items-center w-full space-x-2">
          <RAvatar src={"/svgs/voice-age.svg"} className="size-5 lg:size-6" />
          <span className="text-sm text-mako inline-block">Voice Age</span>
        </span>
        <RSelect
          disabled={disabled}
          value={`${value} ${Number(value) > 1 ? "months" : "month"}`}
          onValueChange={selectHandler}
          options={[
            "1 month",
            "2 months",
            "3 months",
            "4 months",
            "5 months",
            "6 months",
          ]}
          className="border-none outline-none !p-0 w-full h-0 shadow-none justify-end"
        />
      </div>
    </div>
  );
};

export const InputField = ({
  label,
  value,
  onChangeHandler,
  className,
  icon = "/svgs/voice-icon.svg",
  disabled,
  tooltip,
  name,
}: InputProps) => {
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.valueAsNumber;
    onChangeHandler?.(value);
  };

  return (
    <div className="w-full">
      {label ? (
        <h6 className="text-sm text-mako w-full mb-2">{label}</h6>
      ) : tooltip ? (
        <RTooltip
          trigger={<h6 className="text-sm text-mako w-full mb-2">{label}</h6>}
        >
          <p></p>
        </RTooltip>
      ) : null}
      <div
        className={cn(
          "border border-concrete rounded-md py-[0.5625rem] px-2 flex justify-between items-center",
          className
        )}
      >
        <span className="flex w-full items-center space-x-2">
          <RAvatar src={icon} className="size-5 lg:size-6" />
          <span className="text-sm text-mako inline-block">
            {name ? name : "Voice Power"}
          </span>
        </span>
        <input
          min={0}
          type="number"
          value={value}
          disabled={disabled}
          className="outline-none disabled:bg-transparent w-full border-none text-right p-0 text-sm text-mako"
          onChange={inputHandler}
        />
      </div>
    </div>
  );
};

export default InputField;
