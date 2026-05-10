// "use client";

// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
// import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
// import ThemeToggle from "../ThemeToggle";
// import Link from "next/link";

// export default function Topbar() {
//     return (
//         <div className="flex items-center justify-between px-4 py-3 border-">
//             <h2 className="text-lg font-semibold">Dashboard</h2>

//             <div className="flex items-center gap-2">
//                 <CreateProjectDialog>
//                     <Button>
//                         <Plus className="w-4 h-4 mr-2" />
//                         New Project
//                     </Button>
//                 </CreateProjectDialog>
//                 <Link href="/project">New Project</Link>
//                 <ThemeToggle />
//             </div>
//         </div>
//     );
// }


"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";

export default function Topbar() {
    return (
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5 backdrop-blur-md">

            {/* TITLE */}
            <div>
                <h2 className="text-2xl font-bold">
                    Dashboard
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                    Manage your projects and tasks
                </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
                <CreateProjectDialog>
                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">
                        <Plus className="w-4 h-4" mr-2 />
                        new project

                        {/* <Link href="/project" className="bg-blue-600 hover:bg-blue-700 rounded-xl flex justify-between items-center gap-2 px-2"><Plus className="w-4 h-4" />New Project</Link> */}

                    </Button>
                </CreateProjectDialog>

                <ThemeToggle />
            </div>
        </div>
    );
}