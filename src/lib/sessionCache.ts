import {auth} from "@/lib/auth";
import type {Session as AuthSession} from "@/lib/auth";

/**
 * Lightweight in-process dedupe + short TTL cache for auth.api.getSession
 * - Deduplicates concurrent calls for the same key (cookie string)
 * - Keeps a very short TTL (default 1s) to avoid staleness
 * - NOT a replacement for a distributed cache (use Redis for multi-instance)
 */

type CacheEntry = {
  promise: Promise<AuthSession | null>;
  timer: ReturnType<typeof setTimeout>;
};

const cache = new Map<string, CacheEntry>();

function getKey(
  headers?: HeadersInit | Readonly<Headers> | Promise<Readonly<Headers>>,
  req?: Request,
) {
  try {
    if (req && typeof (req as Request).headers?.get === "function") {
      const c = (req as Request).headers.get("cookie");
      if (c) return c;
    }
    // Handle Headers-like or ReadonlyHeaders (next/headers())
    if (
      headers &&
      typeof (headers as unknown as ReadonlyHeadersLike).get === "function"
    ) {
      const c = (headers as unknown as ReadonlyHeadersLike).get!("cookie");
      if (c) return c;
    }
    if (headers && Array.isArray(headers)) {
      for (const [k, v] of headers) {
        if (k.toLowerCase() === "cookie" && v) return v;
      }
    }
    if (headers && typeof headers === "object") {
      const record = headers as Record<string, string>;
      if (record.cookie) return record.cookie;
    }
  } catch {
    // fallthrough
  }
  return "__no_cookie__";
}
type ReadonlyHeadersLike = {
  get?(name: string): string | null;
  entries?(): IterableIterator<[string, string]>;
};

async function normalizeHeaders(
  hdrs?: HeadersInit | Readonly<Headers> | Promise<Readonly<Headers>>,
): Promise<HeadersInit | undefined> {
  if (!hdrs) return undefined;
  const resolved = (hdrs instanceof Promise ? await hdrs : hdrs) as unknown;

  const asHeadersLike = resolved as ReadonlyHeadersLike;
  if (asHeadersLike && typeof asHeadersLike.entries === "function") {
    const out: Record<string, string> = {};
    for (const [k, v] of asHeadersLike.entries()!) {
      out[k] = String(v ?? "");
    }
    return out;
  }

  if (Array.isArray(resolved)) {
    const out: Record<string, string> = {};
    for (const [k, v] of resolved as Array<[string, string]>) out[k] = v;
    return out;
  }

  if (typeof resolved === "object") return resolved as Record<string, string>;
  return undefined;
}

export async function getSessionOnce(
  opts: {
    headers?: HeadersInit | Readonly<Headers> | Promise<Readonly<Headers>>;
    req?: Request;
  } = {},
): Promise<AuthSession | null> {
  const key = getKey(opts.headers, opts.req);
  const existing = cache.get(key);
  if (existing) return existing.promise;

  const normalized = await normalizeHeaders(opts.headers);

  // Ensure cookie found by getKey is included when normalization missed it
  let normalizedWithCookie = normalized;
  if (
    (normalizedWithCookie == null ||
      !(
        typeof normalizedWithCookie === "object" &&
        !Array.isArray(normalizedWithCookie) &&
        ((normalizedWithCookie as Record<string, string>).cookie ||
          (normalizedWithCookie as Record<string, string>).Cookie)
      )) &&
    key !== "__no_cookie__"
  ) {
    normalizedWithCookie = Object.assign({}, normalizedWithCookie || {}, {
      cookie: key,
    });
  }

  // Optional debug: log header keys and a masked session cookie
  if (process.env.SESSION_CACHE_DEBUG) {
    try {
      const hdrKeys =
        normalizedWithCookie &&
        typeof normalizedWithCookie === "object" &&
        !Array.isArray(normalizedWithCookie)
          ? Object.keys(normalizedWithCookie as Record<string, string>)
          : [];
      const cookieRaw =
        normalizedWithCookie &&
        typeof normalizedWithCookie === "object" &&
        !Array.isArray(normalizedWithCookie)
          ? (normalizedWithCookie as Record<string, string>).cookie ||
            (normalizedWithCookie as Record<string, string>).Cookie ||
            ""
          : "";

      const maskSessionCookie = (cookieStr: string) => {
        if (!cookieStr) return "";
        const m = cookieStr.match(/better-auth\.session_token=([^;]+)/);
        if (!m) return cookieStr;
        const token = m[1];
        const masked =
          token.length > 8
            ? `${token.slice(0, 4)}...${token.slice(-4)}`
            : "***";
        return cookieStr.replace(token, masked);
      };

      console.info("sessionCache: header keys=", hdrKeys);
      console.info("sessionCache: cookie=", maskSessionCookie(cookieRaw));
    } catch (err) {
      console.warn("sessionCache: debug log failed", err);
    }
  }

  const start = Date.now();
  const p: Promise<AuthSession | null> = auth.api.getSession({
    headers: (normalizedWithCookie ?? {}) as HeadersInit,
  });

  // Optional debug timing when SESSION_CACHE_DEBUG is set.
  if (process.env.SESSION_CACHE_DEBUG) {
    p.then(() => {
      const dur = Date.now() - start;
      console.info(
        `sessionCache: getSessionOnce resolved in ${dur}ms (key=${key})`,
      );
    }).catch((err) => {
      const dur = Date.now() - start;
      console.warn(
        `sessionCache: getSessionOnce failed in ${dur}ms (key=${key}):`,
        err,
      );
    });
  }

  const ttl = Number(process.env.SESSION_CACHE_TTL_MS) || 1000; // ms
  const timer = setTimeout(() => cache.delete(key), ttl);

  cache.set(key, {promise: p, timer});

  // ensure that if the promise rejects we still evict quickly
  p.catch(() => {
    const e = cache.get(key);
    if (e) {
      clearTimeout(e.timer);
      cache.delete(key);
    }
  });

  return p;
}

export function resetSessionCacheForKey(key: string) {
  const e = cache.get(key);
  if (e) {
    clearTimeout(e.timer);
    cache.delete(key);
  }
}

export function clearSessionCache() {
  for (const [k, v] of cache.entries()) {
    clearTimeout(v.timer);
    cache.delete(k);
  }
}

const sessionCache = {
  getSessionOnce,
  resetSessionCacheForKey,
  clearSessionCache,
};

export default sessionCache;
