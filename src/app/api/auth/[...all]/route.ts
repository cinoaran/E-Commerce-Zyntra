import {auth} from "@/lib/auth"; // path to your auth file
import {toNextJsHandler} from "better-auth/next-js";
import {checkRateLimit} from "@/lib/rate-limit";

const handlers = toNextJsHandler(auth);

async function shouldRateLimit(req: Request) {
  // only limit POSTs to sensitive auth paths (sign-in, sign-up, reset, verify)
  if (req.method?.toUpperCase() !== "POST") return {limited: false};
  try {
    const path = new URL(req.url).pathname;
    const sensitive = /sign-in|sign-up|reset|verify|password/i.test(path);
    if (!sensitive) return {limited: false};
    return {limited: true};
  } catch {
    return {limited: true};
  }
}

export const POST = async (req: Request) => {
  const {limited} = await shouldRateLimit(req);
  if (limited) {
    const result = checkRateLimit(req);
    if (!result.allowed) {
      const body = JSON.stringify({
        message: "Too Many Requests",
        retryAfter: result.retryAfter,
      });
      return new Response(body, {
        status: 429,
        headers: {
          "Retry-After": String(result.retryAfter),
          "Content-Type": "application/json",
        },
      });
    }
  }

  return handlers.POST ? handlers.POST(req) : new Response(null, {status: 405});
};

export const GET = async (req: Request) => {
  return handlers.GET ? handlers.GET(req) : new Response(null, {status: 405});
};
