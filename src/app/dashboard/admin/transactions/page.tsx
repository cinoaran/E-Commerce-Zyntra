import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {getSessionOnce} from "@/lib/sessionCache";

export default async function TransactionsPage() {
  const hdrs = await headers();
  const session = await getSessionOnce({headers: hdrs});

  if (!session || !session.user || !session.user.id) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <p className="mt-4">(Placeholder) No transactions available.</p>
    </div>
  );
}
