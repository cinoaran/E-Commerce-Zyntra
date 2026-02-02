export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Zyntra";
export const APP_NAME_SECOND =
  process.env.NEXT_PUBLIC_APP_NAME_SECOND || "Shop";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Zyntra Shop - Your One-Stop Online Store";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT = 10;
export const MAX_PRODUCTS_LIMIT = 100;

export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";

// lib/constants/index.ts – erweitern
export const CATEGORY_UNITS = {
  schuhe: {label: "EU", type: "numeric"},
  kleidung: {label: "XS-XXL", type: "string"},
} as const;

export const EU_SIZES = [
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
] as const;
export const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
