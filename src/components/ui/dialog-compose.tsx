import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode | string;
  contentClassName?: string;
}

const RDialog = ({ children, trigger, contentClassName = "w-full" }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className={contentClassName}>
        <DialogTitle hidden>
          <DialogHeader>Voice on Chain</DialogHeader>
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default RDialog;
