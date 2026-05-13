// import PublicOnlyRoute from "@/components/auth/PublicOnlyRoute";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-6 py-10">
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-blue-500/20 blur-3xl rounded-full" />
                <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-cyan-500/20 blur-3xl rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* HEADER */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <UserPlus size={30} />
                    </div>

                    <h1 className="text-3xl font-bold mt-5">
                        Create Account
                    </h1>

                    <p className="text-slate-400 text-sm mt-2 text-center">
                        Start managing projects, teams & tasks in one place
                    </p>
                </div>

                {/* CARD */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <RegisterForm />

                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-sm text-slate-400">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-blue-400 hover:text-blue-300 transition font-medium"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}