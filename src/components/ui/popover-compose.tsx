import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode | string;
  contentClassName?: string;
}

const RPopover = ({
  children,
  trigger,
  contentClassName = "w-full",
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={contentClassName}>{children}</PopoverContent>
    </Popover>
  );
};

export default RPopover;
