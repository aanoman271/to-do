import Navbar from "@/componet/Navbar";
import React from "react";
import "./globals.css";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-50 text-zinc-900">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
};

export default Layout;
