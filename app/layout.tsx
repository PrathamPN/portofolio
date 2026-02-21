import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pratham P N | AI & ML Student",
  description: "Portfolio of Pratham P N — a BE AI & Machine Learning student at Sahyadri College of Engineering & Management, building intelligent systems and modern software.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
