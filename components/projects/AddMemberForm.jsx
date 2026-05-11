"use client";

const AddMemberForm = ({
    selectedUser,
    setSelectedUser,
    availableUsers,
    handleAddMember,
    isPending,
}) => {
    return (
        <div className="space-y-4">
            <select
                className="w-full bg-[#111827] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedUser}
                onChange={(e) =>
                    setSelectedUser(e.target.value)
                }
            >
                <option value="">
                    Select user
                </option>

                {availableUsers?.map((user) => (
                    <option
                        key={user._id}
                        value={user._id}
                    >
                        {user.name} ({user.email})
                    </option>
                ))}
            </select>

            <button
                onClick={handleAddMember}
                disabled={!selectedUser || isPending}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition py-3 rounded-xl font-medium"
            >
                {isPending ? "Adding Member..." : "Add Member"}
            </button>
        </div>
    );
};

export default AddMemberForm;