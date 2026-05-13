// // components/project/ProjectHeader.jsx

// "use client";

// import { FolderKanban, Clock3 } from "lucide-react";
// import Link from "next/link";

// const ProjectHeader = ({ projectId, projectTitle }) => {
//     return (
//         <div className="border-b border-white/10 bg-white/5 backdrop-blur-md">
//             <div className="max-w-7xl mx-auto px-6 py-6">
//                 <div className="flex items-center justify-between">
//                     {/* LEFT SIDE */}
//                     <div>
//                         <div className="flex items-center gap-3">
//                             <div className="p-3 rounded-xl bg-blue-600">
//                                 <FolderKanban size={24} />
//                             </div>

//                             <div>
//                                 <h1 className="text-3xl font-bold tracking-tight">
//                                     <Link href="/dashboard">
//                                         Project Dashboard
//                                     </Link>
//                                 </h1>

//                                 <p className="text-slate-400 mt-1">
//                                     Manage tasks, members & workflow
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT SIDE */}
//                     <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
//                         <Clock3
//                             size={18}
//                             className="text-blue-400"
//                         />

//                         <div>
//                             <p className="text-xs text-slate-400">
//                                 {projectId}
//                             </p>

//                             <p className="font-medium">
//                                 {projectTitle}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProjectHeader;


"use client";

import {
    FolderKanban,
    Clock3,
    CalendarDays,
} from "lucide-react";

import Link from "next/link";

import {
    differenceInDays,
    format,
} from "date-fns";

const ProjectHeader = ({
    projectId,
    projectTitle,
    dueDate,
}) => {

    const daysLeft = dueDate
        ? differenceInDays(
            new Date(dueDate),
            new Date()
        )
        : null;

    return (
        <div className="border-b border-white/10 bg-white/5 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-6">

                <div className="flex items-center justify-between">

                    {/* LEFT SIDE */}
                    <div>
                        <div className="flex items-center gap-3">

                            <div className="p-3 rounded-xl bg-blue-600">
                                <FolderKanban size={24} />
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">
                                    <Link href="/dashboard">
                                        Project Dashboard
                                    </Link>
                                </h1>

                                <p className="text-slate-400 mt-1">
                                    Manage tasks, members & workflow
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="hidden md:flex items-center gap-4">

                        {/* PROJECT INFO */}
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
                            <Clock3
                                size={18}
                                className="text-blue-400"
                            />

                            <div>
                                <p className="text-xs text-slate-400">
                                    {projectId}
                                </p>

                                <p className="font-medium">
                                    {projectTitle}
                                </p>
                            </div>
                        </div>

                        {/* DEADLINE */}
                        {dueDate && (
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">

                                <CalendarDays
                                    size={18}
                                    className="text-yellow-400"
                                />

                                <div>
                                    <p className="text-xs text-slate-400">
                                        Deadline
                                    </p>

                                    <p className="font-medium">
                                        {format(
                                            new Date(dueDate),
                                            "PPP"
                                        )}
                                    </p>

                                    <p
                                        className={`text-xs mt-1 ${daysLeft < 0
                                                ? "text-red-400"
                                                : daysLeft <= 3
                                                    ? "text-yellow-400"
                                                    : "text-green-400"
                                            }`}
                                    >
                                        {daysLeft < 0
                                            ? "Overdue"
                                            : `${daysLeft} day${daysLeft !== 1
                                                ? "s"
                                                : ""
                                            } left`}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectHeader;