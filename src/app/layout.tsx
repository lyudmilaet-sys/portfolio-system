import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liudmyla Khlystun | UX/UI Designer",
  description: "Portfolio of Liudmyla Khlystun, UX/UI Designer and AI UX/UI Engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-canvas text-ink">{children}</body>
    </html>
  );
}
