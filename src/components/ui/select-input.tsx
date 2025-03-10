"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.ComponentProps<"select"> {
  options: string[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const RSelect = ({
  className,
  value,
  placeholder,
  onValueChange,
  options,
}: Props) => {
  return (
    <Select value={value as string} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-[180px] capitalize", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem
            key={index}
            value={option}
            className="capitalize text-sm text-dove-gray"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RSelect;
