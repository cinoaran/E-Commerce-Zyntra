import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {ensureSession} from "@/acl/acl";

export default async function UserDashboardPage() {
  const hdrs = await headers();
  const session = await ensureSession({headers: hdrs});

  console.log("UserDashboardPage session:", session);

  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  if (session.user.role !== "user") {
    // Not authorized for user dashboard
    redirect("/");
  }
  // Redirect to the user default subpage
  redirect(`/dashboard/user/orders`);
}
