"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

export function DateTimePicker({
  date,
  setDate,
  placeholder = "Select date and time",
  fromDate,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [time, setTime] = React.useState({
    hour: date ? date.getHours() % 12 || 12 : 12,
    minute: date ? date.getMinutes() : 0,
    ampm: date ? (date.getHours() >= 12 ? "PM" : "AM") : "AM",
  });

  React.useEffect(() => {
    if (date) {
      setTime({
        hour: date.getHours() % 12 || 12,
        minute: date.getMinutes(),
        ampm: date.getHours() >= 12 ? "PM" : "AM",
      });
    }
  }, [date]);

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(
        time.ampm === "PM" ? (time.hour % 12) + 12 : time.hour % 12
      );
      newDate.setMinutes(time.minute);
      setDate(newDate);
    }
  };

  const handleTimeChange = (type, value) => {
    const newTime = { ...time };

    if (type === "hour") {
      newTime.hour = parseInt(value);
    } else if (type === "minute") {
      newTime.minute = parseInt(value);
    } else if (type === "ampm") {
      newTime.ampm = value;
    }

    setTime(newTime);

    if (date) {
      const newDate = new Date(date);
      const hours =
        newTime.ampm === "PM" ? (newTime.hour % 12) + 12 : newTime.hour % 12;

      newDate.setHours(hours);
      newDate.setMinutes(newTime.minute);
      setDate(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "MMM dd, yyyy hh:mm aa") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 max-w-[95vw]" align="start">
        <div className="flex flex-row">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            fromDate={fromDate}
            className="border-0 text-xs sm:text-sm"
          />
          <div
            className="border-l p-1 sm:p-3 w-full min-w-0"
            style={{ minWidth: "130px" }}
          >
            <div
              className="border-l p-1 sm:p-3 w-full min-w-0"
              style={{ minWidth: "110px" }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-2 mb-2 sm:mb-4">
                {/* Hour and Minute - Always side by side */}
                <div className="grid md:grid-cols-2 gap-1 mb-2 sm:mb-0">
                  <div className="text-center flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium mb-1">
                      Hour
                    </div>
                    <ScrollArea className="h-24 sm:h-40 w-full max-w-12 sm:max-w-16 mx-auto rounded-md border">
                      <div className="p-0.5 sm:p-2 space-y-0.5 sm:space-y-1">
                        {hours.map((hour) => (
                          <Button
                            key={hour}
                            variant={time.hour === hour ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-center text-xs h-5 sm:h-8 px-0.5 sm:px-1"
                            onClick={() => handleTimeChange("hour", hour)}
                          >
                            {hour.toString().padStart(2, "0")}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  <div className="text-center flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium mb-1">
                      Min
                    </div>
                    <ScrollArea className="h-24 sm:h-40 w-full max-w-12 sm:max-w-16 mx-auto rounded-md border">
                      <div className="p-0.5 sm:p-2 space-y-0.5 sm:space-y-1">
                        {minutes.map((minute) => (
                          <Button
                            key={minute}
                            variant={
                              time.minute === minute ? "default" : "ghost"
                            }
                            size="sm"
                            className="w-full justify-center text-xs h-5 sm:h-8 px-0.5 sm:px-1"
                            onClick={() => handleTimeChange("minute", minute)}
                          >
                            {minute.toString().padStart(2, "0")}
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>

                {/* AM/PM - Below on mobile, inline on desktop */}
                <div className="text-center flex-1 sm:min-w-0">
                  <div className="text-xs sm:text-sm font-medium mb-1">
                    Period
                  </div>
                  <div className="flex justify-center gap-1 sm:flex-col sm:space-y-0.5 sm:gap-0">
                    <Button
                      variant={time.ampm === "AM" ? "default" : "ghost"}
                      size="sm"
                      className="flex-1 sm:w-full text-xs h-5 sm:h-8 px-2 sm:px-0.5"
                      onClick={() => handleTimeChange("ampm", "AM")}
                    >
                      AM
                    </Button>
                    <Button
                      variant={time.ampm === "PM" ? "default" : "ghost"}
                      size="sm"
                      className="flex-1 sm:w-full text-xs h-5 sm:h-8 px-2 sm:px-0.5"
                      onClick={() => handleTimeChange("ampm", "PM")}
                    >
                      PM
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end p-2 border-t">
          <Button
            size="sm"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto"
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
