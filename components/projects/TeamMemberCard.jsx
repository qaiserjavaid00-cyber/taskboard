"use client";

const TeamMemberCard = ({
    user,
    isOwner,
    onRemove,
}) => {
    return (
        <div className="flex items-center justify-between bg-[#111827] border border-white/5 rounded-xl px-4 py-3">
            {/* LEFT */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold">
                    {user.name?.charAt(0)}
                </div>

                <div>
                    <p className="font-medium">
                        {user.name}
                    </p>

                    <p className="text-xs text-slate-400">
                        {user.email}
                    </p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
                <span className="text-xs text-emerald-400">
                    Active
                </span>

                {!isOwner && (
                    <button
                        onClick={() =>
                            onRemove(user._id)
                        }
                        className="text-red-400 hover:text-red-300 text-lg font-bold"
                        title="Remove member"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default TeamMemberCard;