import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liudmyla Khlystun — UX/UI Designer",
  description: "Portfolio of Liudmyla Khlystun, UX/UI Designer and AI UX/UI Engineer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
