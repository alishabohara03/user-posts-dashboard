import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User & Posts Dashboard",
  description: "Browse users and their posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <nav className="navbar">
          <a href="/" className="nav-brand">
            <span className="brand-dot" />
            Dashboard
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
