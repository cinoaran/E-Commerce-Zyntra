type Bucket = {count: number; windowStart: number};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 60_000; // 1 minute
const MAX_PER_WINDOW = Number(process.env.AUTH_RATE_LIMIT_MAX) || 10;

function getIpKey(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  try {
    const url = new URL(req.url);
    return url.hostname || "unknown";
  } catch {
    return "unknown";
  }
}

export function checkRateLimit(
  req: Request,
): {allowed: true} | {allowed: false; retryAfter: number} {
  const key = getIpKey(req);
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart >= WINDOW_MS) {
    buckets.set(key, {count: 1, windowStart: now});
    return {allowed: true};
  }

  bucket.count += 1;
  if (bucket.count > MAX_PER_WINDOW) {
    const retryAfter = Math.ceil((bucket.windowStart + WINDOW_MS - now) / 1000);
    return {allowed: false, retryAfter};
  }

  return {allowed: true};
}

export function resetRateLimitForKey(ip: string) {
  buckets.delete(ip);
}

// NOTE: This in-memory limiter is OK for development or single-instance deployments.
// For production use a centralized store (Redis) or a mature library like `rate-limiter-flexible`.
