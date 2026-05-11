// import PublicOnlyRoute from "@/components/auth/PublicOnlyRoute";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-6 rounded-2xl shadow w-80">
                <h1 className="text-xl font-semibold mb-4 text-center">
                    TaskBoard Login
                </h1>

                <LoginForm />

                <p className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600">
                        Register
                    </Link>
                </p>
            </div>
        </div>

    );
}