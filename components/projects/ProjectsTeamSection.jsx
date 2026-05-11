// components/project/ProjectTeamSection.jsx

"use client";

import { Users } from "lucide-react";

import { TeamSkeleton } from "@/components/skeletons/TeamSkeleton";
import AddMemberForm from "./AddMemberForm";
import TeamMemberCard from "./TeamMemberCard";

const ProjectTeamSection = ({
    selectedUser,
    setSelectedUser,
    availableUsers,
    handleAddMember,
    addMember,
    usersLoading,
    project,
    removeMember,
}) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-purple-500/20">
                    <Users className="text-purple-400" />
                </div>

                <div>
                    <h2 className="text-xl font-semibold">
                        Team Members
                    </h2>

                    <p className="text-slate-400 text-sm">
                        Invite people to collaborate
                    </p>
                </div>
            </div>

            {/* ADD MEMBER */}
            <div className="space-y-4">

                <AddMemberForm
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    availableUsers={availableUsers}
                    handleAddMember={handleAddMember}
                    isPending={addMember.isPending}
                />
            </div>

            {/* MEMBERS */}
            {usersLoading ? (
                <TeamSkeleton />
            ) : (
                <div className="mt-8">
                    <h3 className="text-sm font-medium text-slate-400 mb-3">
                        Active Team by{" "}
                        <span className="font-bold italic text-emerald-700">
                            {project?.owner?.name}
                        </span>
                    </h3>

                    <div className="space-y-3">
                        {project?.members?.map((user) => (
                            <TeamMemberCard
                                key={user?._id}
                                user={user}
                                isOwner={project?.owner?._id === user?._id}
                                isRemoving={
                                    removeMember.isPending
                                    // removeMember.variables === user._id
                                }
                                onRemove={(id) =>
                                    removeMember.mutate(id)
                                }
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectTeamSection;