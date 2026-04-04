import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {ensureSession} from "@/acl/acl";

export default async function AdminDashboardPage() {
  const hdrs = await headers();
  const session = await ensureSession({headers: hdrs});

  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    // Not authorized for admin dashboard
    redirect("/");
  }
  // Redirect to the admin default subpage
  redirect(`/dashboard/admin/transactions`);
}
