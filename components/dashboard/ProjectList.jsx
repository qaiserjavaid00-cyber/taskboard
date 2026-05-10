
"use client";

import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects = [], isLoading }) {
    if (!projects.length) {
        return (
            <p className="text-gray-500 mt-4">
                No projects yet. Create one!
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-3 mt-4">
            {projects.map((project) => (
                <ProjectCard
                    key={project._id}
                    project={project}
                />
            ))}
        </div>
    );
}