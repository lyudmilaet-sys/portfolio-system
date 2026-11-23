import { Inter } from "next/font/google";

/**
 * Inter — the only typeface of the design system (weights 400 / 500 / 600).
 * Shared by the site layout and the Storybook preview.
 * Cyrillic is loaded explicitly: by default next/font loads Latin only,
 * and Ukrainian text would silently fall back to another font.
 */
export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});
