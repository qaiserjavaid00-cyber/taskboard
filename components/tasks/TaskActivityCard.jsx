export default function TaskActivityCard({ task }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-5">
                Activity
            </h2>

            <div className="space-y-5">
                <div className="flex gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>

                    <div>
                        <p className="text-sm text-slate-300">
                            Task status:
                            <span className="text-blue-400">
                                {" "}
                                {task.status}
                            </span>
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            Latest update
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mt-2"></div>

                    <div>
                        <p className="text-sm text-slate-300">
                            Task created
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            {new Date(
                                task.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}