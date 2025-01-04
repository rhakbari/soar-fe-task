"use client";
import "./globals.css";
import React, { Suspense, useState } from "react";
import Loader from "@/shared/mainComponents/loader";
import { Toaster } from "@/components/ui/toaster";

const Sidebar = React.lazy(() => import("@/shared/mainComponents/sidebar"));
const Header = React.lazy(() => import("@/shared/mainComponents/header"));

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
          <Suspense fallback={<Loader />}>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </Suspense>

          <div className="flex-1 flex flex-col ml-0 lg:ml-64">
            <div className="fixed top-0 right-0 left-0 lg:left-64 z-10">
              <Suspense fallback={<Loader />}>
                <Header isOpen={isOpen} setIsOpen={setIsOpen} />
              </Suspense>
            </div>

            <main className="p-6 mt-16">
              {children}
              <Toaster />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}