"use client";

import { useEffect, useState } from "react";

import { DateRange } from "react-day-picker";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
}

export function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(() => {
    return { from: startOfMonth(new Date()), to: endOfMonth(new Date()) };
  });

  const onSelect = (selectedDateRange: DateRange | undefined) => {
    setDate(selectedDateRange);
  };

  useEffect(() => {
    onDateRangeChange(date);
  }, [date, onDateRangeChange]);

  return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full", !date && "text-muted-foreground")}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "MMMM do, yyyy")} -{" "}
                  {format(date.to, "MMMM do, yyyy")}
                </>
              ) : (
                format(date.from, "MMMM do, yyyy")
              )
            ) : (
              <span>Выберите Дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            defaultMonth={date?.from}
            selected={date}
            onSelect={onSelect}
            numberOfMonths={2}
            mode="range"
          />
        </PopoverContent>
      </Popover>
  );
}
