import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";


function getUser() {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}

export default getUser;