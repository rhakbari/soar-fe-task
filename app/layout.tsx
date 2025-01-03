"use client";
import "./globals.css";
import React, { Suspense, useState } from "react";
import Loader from "@/shared/customComponents/loader"; // Custom loader component
// Lazy load Sidebar and Header components
const Sidebar = React.lazy(() => import("@/shared/customComponents/sidebar"));
const Header = React.lazy(() => import("@/shared/customComponents/header"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <html lang="en">
      <head>
        <title>{"Soar Task"}</title>
      </head>
      <body className="min-h-screen bg-[#F8F9FD] font-sans">
        <div className="flex min-h-screen bg-[#F8F9FD] font-sans">
          {/* Sidebar */}
          <Suspense fallback={<Loader />}>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </Suspense>

          <div className="flex-1 flex flex-col ml-0 lg:ml-64">
            {/* Header */}
            <Suspense fallback={<Loader />}>
              <Header isOpen={isOpen} setIsOpen={setIsOpen} />
            </Suspense>

            {/* Main Content */}
            <main className="p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
