// Beispiel: zentrale Role->Permission Map
export const rolePermissions: Record<string, string[]> = {
  guest: [],
  customer: ["order:create", "order:view:own"],
  merchant: [
    "product:create",
    "product:update",
    "product:delete",
    "order:view:own",
  ],
  "merchant-admin": [
    "product:create",
    "product:update",
    "merchant:manage",
    "order:view:own",
  ],
  fulfillment: ["order:fulfillment"],
  support: ["order:view:all", "support:ticket:create"],
  marketing: ["promotion:create", "content:manage"],
  finance: ["payout:create", "refund:approve", "reports:view"],
  auditor: ["reports:view"],
  admin: ["*"],
  developer: ["deploy", "featureflags:toggle"],
};

// Tipp: diese Datei nur als Vorlage verwenden. In Produktion an eine
// zentrale Stelle auslagern oder dynamisch aus DB/Config laden.

export type Role = keyof typeof rolePermissions;
