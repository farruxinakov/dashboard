"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  disabled: boolean;
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
}

export function DatePicker({ disabled, selected, onSelect }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn("w-full ", !selected && "text-muted-foreground")}
        >
          <CalendarIcon />
          {selected ? format(selected, "PPP") : <span>Выберите Дату</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar selected={selected} onSelect={onSelect} mode="single" />
      </PopoverContent>
    </Popover>
  );
}
