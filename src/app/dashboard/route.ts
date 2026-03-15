import {getSessionOnce} from "@/lib/sessionCache";

export async function GET(req: Request) {
  try {
    const start = Date.now();
    const session = await getSessionOnce({req});
    const afterSession = Date.now();
    const base = new URL(req.url).origin;
    const afterUrl = Date.now();

    if (process.env.SESSION_ROUTE_DEBUG) {
      console.info(
        `dashboard/route: getSessionOnce ${afterSession - start}ms; url parse ${afterUrl - afterSession}ms; total so far ${afterUrl - start}ms`,
      );
    }
    console.log("Session", session);

    if (!session || !session.user || !session.user.id) {
      return new Response(null, {
        status: 302,
        headers: {Location: `${base}/login`},
      });
    }

    const role = session.user.role || "user";

    // Server-side redirect to role-specific dashboard route.
    // Role-specific routes should still enforce server-side ACLs.

    return new Response(null, {
      status: 307,
      headers: {Location: `${base}/dashboard/${role}`},
    });
  } catch (err) {
    console.error("Error in dashboard route:", err);
    // On error, redirect to login
    const base = new URL(req.url).origin;
    return new Response(null, {
      status: 302,
      headers: {Location: `${base}/login`},
    });
  }
}
