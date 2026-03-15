import {rolePermissions} from "./policies.example";

/**
 * ACL Beispiel-Helpers (nur Demo, nicht automatisch importiert)
 * Ziel: Zeigt ein nicht-invasives Muster, das du manuell übernehmen kannst.
 */

// Dummy-Session-Typ (anpassen an dein Auth-Package)
type Session = {user: {id: string; role: string}} | null;

// Beispiel: wie man Session holt (pseudocode)
export async function ensureSessionExample(
  opts: {
    headers?: HeadersInit;
    req?: Request;
  } = {},
): Promise<Session> {
  // In deiner App würde das z.B. `auth.api.getSession({ headers: opts.headers })` sein
  // We reference the args to avoid unused-parameter lint warnings in this demo.
  const {headers, req} = opts;
  void headers;
  void req;
  throw new Error("Replace with your auth.api.getSession call");
}

export function requireRoleExample(session: Session, roles: string | string[]) {
  if (!session) throw new Error("Unauthorized");
  const allowed = Array.isArray(roles) ? roles : [roles];
  if (!allowed.includes(session.user.role))
    throw new Error("Forbidden: insufficient role");
  return true;
}

export function requirePermissionExample(session: Session, permission: string) {
  if (!session) throw new Error("Unauthorized");
  const perms =
    rolePermissions[session.user.role as keyof typeof rolePermissions] || [];
  if (perms.includes("*") || perms.includes(permission)) return true;
  throw new Error("Forbidden: insufficient permission");
}

/* Usage (Server action)
import { headers } from 'next/headers'
import { ensureSessionExample, requirePermissionExample } from '@/acl/acl.example'

export async function action(data) {
  const session = await ensureSessionExample({ headers: await headers() })
  requirePermissionExample(session, 'user:manage')
  // perform admin task
}
*/
