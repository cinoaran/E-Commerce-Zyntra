import disposableDomains from "disposable-email-domains";

export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;

  const atIndex = email.indexOf("@");
  if (atIndex === -1) return false;

  // extract and normalize domain
  let domain = email
    .slice(atIndex + 1)
    .toLowerCase()
    .trim();
  if (!domain) return false;
  // remove trailing dot if any
  domain = domain.replace(/\.+$/g, "");

  const parts = domain.split(".").filter(Boolean);
  if (parts.length === 0) return false;

  // check the full domain and each parent domain (handles subdomains)
  for (let i = 0; i < parts.length; i++) {
    const candidate = parts.slice(i).join(".");
    if (disposableDomains.includes(candidate)) return true;
  }

  return false;
}
