import { MessageSquare, Paperclip } from "lucide-react";

export default function TaskDiscussionSection() {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="text-blue-400" />

                <h2 className="text-xl font-semibold">
                    Discussion
                </h2>
            </div>

            <div className="mb-6">
                <textarea
                    placeholder="Write a comment..."
                    className="w-full bg-[#111827] border border-white/10 rounded-xl p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                />

                <div className="flex justify-between items-center mt-3">
                    <button className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                        <Paperclip size={16} />
                        Attach File
                    </button>

                    <button className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-xl font-medium">
                        Comment
                    </button>
                </div>
            </div>

            <div className="border border-dashed border-white/10 rounded-xl p-8 text-center text-slate-400">
                No comments yet
            </div>
        </div>
    );
}