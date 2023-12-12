import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Navbar />
      <div className="hidden md:flex mt-16 w-26 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className="max-w-7xl m-auto md:ml-32 p-4">{children}</main>
    </div>
  );
}
