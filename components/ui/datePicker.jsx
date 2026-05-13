// "use client";

// import * as React from "react";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";

// const DatePicker = ({
//     label = "Select Date",
//     value,
//     onChange,
//     placeholder = "Pick a date",
// }) => {
//     const today = React.useMemo(() => {
//         const d = new Date();
//         d.setHours(0, 0, 0, 0);
//         return d;
//     }, []);

//     const [open, setOpen] = React.useState(false);

//     return (
//         <div className="space-y-2">
//             {label && (
//                 <p className="text-sm text-slate-400">
//                     {label}
//                 </p>
//             )}

//             <Popover open={open} onOpenChange={setOpen}>
//                 <PopoverTrigger asChild>
//                     <Button
//                         type="button"
//                         variant="outline"
//                         className={cn(
//                             "w-full justify-start text-left font-normal bg-[#111827] border border-white/10 text-white hover:bg-[#1f2937]",
//                             !value && "text-slate-400"
//                         )}
//                     >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {value
//                             ? format(value, "PPP")
//                             : placeholder}
//                     </Button>
//                 </PopoverTrigger>

//                 <PopoverContent
//                     className="w-auto p-0 bg-[#0f172a] border border-white/10 z-[9999]"
//                     align="start"
//                 >
//                     <Calendar
//                         mode="single"
//                         selected={value}
//                         onSelect={(date) => {
//                             onChange(date);
//                             setOpen(false); // auto close after select
//                         }}
//                         initialFocus
//                         disabled={(date) =>
//                             date < today
//                         }
//                     />
//                 </PopoverContent>
//             </Popover>
//         </div >
//     );
// };

// export default DatePicker;


"use client";

import { useState, useRef, useEffect } from "react";

export default function DatePicker({
    value,
    onChange,
    label = "Due Date",
    placeholder = "Select a date",
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // generate next 30 days for simplicity (clean UX)
    const generateDates = () => {
        const dates = [];
        for (let i = 0; i < 30; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            d.setHours(0, 0, 0, 0);
            dates.push(new Date(d));
        }
        return dates;
    };

    const dates = generateDates();

    return (
        <div className="w-full space-y-2 relative" ref={ref}>
            {label && (
                <p className="text-sm text-slate-400">{label}</p>
            )}

            {/* Input Button */}
            <button
                type="button"
                onClick={() => setOpen((p) => !p)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#111827] border border-white/10 text-white hover:bg-[#1f2937] transition"
            >
                <span className={value ? "text-white" : "text-slate-400"}>
                    {value ? formatDate(value) : placeholder}
                </span>

                <svg
                    className="w-4 h-4 opacity-70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-[#0f172a] shadow-lg p-3 max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                        {dates.map((date, idx) => {
                            const isDisabled = date < today;
                            const isSelected =
                                value &&
                                new Date(value).toDateString() ===
                                date.toDateString();

                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={() => {
                                        console.log("📅 Selected date:", date);
                                        onChange(date);
                                        setOpen(false);
                                    }}
                                    className={`px-3 py-2 rounded-lg text-sm transition text-left
                                        ${isDisabled
                                            ? "opacity-30 cursor-not-allowed"
                                            : "hover:bg-white/10"
                                        }
                                        ${isSelected
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-200"
                                        }
                                    `}
                                >
                                    {date.toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                    })}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}