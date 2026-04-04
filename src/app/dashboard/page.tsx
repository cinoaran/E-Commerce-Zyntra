import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {ensureSession} from "@/acl/acl";

export default async function DashboardPage() {
  const session = await ensureSession({headers: await headers()});

  if (!session?.user?.id) {
    redirect("/login");
  }

  const role = session.user.role || "user";
  redirect(`/dashboard/${role}`);
}
