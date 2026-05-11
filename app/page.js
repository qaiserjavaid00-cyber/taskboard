import { redirect } from "next/navigation";
import getUser from "@/lib/helpers/getUser";

export default async function HomePage() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "admin") {
    redirect("/admin/projects");
  }

  redirect("/dashboard");
}