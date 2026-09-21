import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transetu | Seamless Travel. Smarter Solutions.",
  description: "Transetu provides reliable FASTag solutions, GPS tracking systems, and premium holders for a smoother journey.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
