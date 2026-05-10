import PublicOnlyRoute from "@/components/auth/PublicOnlyRoute";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <PublicOnlyRoute>

            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-6 rounded-2xl shadow w-80">
                    <h1 className="text-xl font-semibold mb-4 text-center">
                        Create Account
                    </h1>

                    <RegisterForm />

                    <p className="text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </PublicOnlyRoute>
    );
}