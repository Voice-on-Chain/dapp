import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { FormControl } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface DateInputProps {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  noForm?: boolean;
}

export const DateInput = ({ value, onChange, noForm }: DateInputProps) => {
  const [isOpen, setOpenState] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setOpenState}>
      <PopoverTrigger asChild>
        {noForm ? (
          <Button
            onClick={() => setOpenState(true)}
            variant={"outline"}
            className={cn(
              "!w-full !font-normal !text-left !p-[0.875rem] shadow-none !text-xs !text-mako"
            )}
          >
            {value ? (
              format(value, "PP")
            ) : (
              <span className="text-gray">Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        ) : (
          <FormControl>
            <Button
              onClick={() => setOpenState(true)}
              variant={"outline"}
              className={cn(
                "!w-full !font-normal !text-left !p-[0.875rem] !text-xs !text-mako"
              )}
            >
              {value ? (
                format(value, "PP")
              ) : (
                <span className="text-gray">Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          onDayClick={() => setOpenState(false)}
          disabled={(date) => date < new Date("1900-01-01")}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
