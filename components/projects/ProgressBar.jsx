import React from 'react'

const ProgressBar = () => {
    return (
        <div>
            {/* PROGRESS SECTION */}
            <div className="mt-5">

                <div className="flex justify-between mb-2">
                    <p className="text-xs text-slate-400">
                        Project Progress
                    </p>

                    <p className="text-xs text-slate-400">
                        {completedTasks}/{totalTasks} Tasks
                    </p>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProgressBar