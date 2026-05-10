"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ projects = [], tasks = [] }) {
    const total = projects.length;

    const activeTasks = tasks.filter(
        (t) => t.status === "todo" || t.status === "in-progress"
    ).length;

    const completedTasks = tasks.filter(
        (t) => t.status === "done"
    ).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Total Projects</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">
                    {total}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Active Tasks</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">
                    {activeTasks}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Completed</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">
                    {completedTasks}
                </CardContent>
            </Card>
        </div>
    );
}