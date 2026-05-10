"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const DatePicker = ({
    label = "Select Date",
    value,
    onChange,
    placeholder = "Pick a date",
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <p className="text-sm text-slate-400">
                    {label}
                </p>
            )}

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "w-full justify-start text-left font-normal bg-[#111827] border border-white/10 text-white hover:bg-[#1f2937]",
                            !value && "text-slate-400"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {value
                            ? format(value, "PPP")
                            : placeholder}
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto p-0 bg-[#0f172a] border border-white/10"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={value}
                        onSelect={onChange}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DatePicker;